import {
  Color,
  Mode,
  GameData,
  Room,
  UnfinishedRoom,
  Team,
  RecursivePartial,
  PlayerData,
  Scores,
  BoardData,
  CellData
} from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard } from "./utils";
import { BLACK_WORDS, GUESSER_SUFFIX, SPYMASTER_SUFFIX, STARTING_SCORES } from "./constants";
import { setupServer } from "./server";
import { cloneDeep, merge, shuffle } from "lodash";
import { Collection, Db, DeleteResult } from "mongodb";
import * as dotenv from "dotenv";
import Queue from "queue-promise";
import { GameHistory, Queues } from "./types";
import { setupMongoDatabase } from "./mongo";
import { hashSync } from "bcryptjs";

// Setup environment variables
dotenv.config();

// Setup promise queues
const queues: Queues = {};

// Setup IO server
const io = setupServer();

// Setup MongoDB database
let rooms: Collection | undefined;
let history: Collection | undefined;
setupMongoDatabase().then((db: Db | undefined) => {
  rooms = db?.collection("rooms");
  history = db?.collection("history");

  // Upon server start, remove all players from all rooms.
  rooms?.updateMany({}, { $set: { players: [] } });
});

/**
 * Gets a room from the mongo database.
 * @param roomCode
 */
const mongoGetRoom = async (roomCode: string): Promise<Room | null | undefined> => {
  const room = (await rooms?.findOne({ code: roomCode })) as Room | null | undefined;
  return room;
};

/**
 * Updates a room on the mongo database.
 * @param roomCode
 * @param data
 */
const mongoUpdateRoom = async (roomCode: string, data: any): Promise<void> => {
  const currentRoom = await mongoGetRoom(roomCode);
  if (currentRoom) {
    const newRoom = merge(currentRoom, data) as Room;
    updateGame(newRoom);
    await rooms?.replaceOne({ code: roomCode }, newRoom, { upsert: true });
  } else {
    throw "Error: could not find room in database when attempting to update.";
  }
};

/**
 * Adds new game history entry.
 * @param room
 */
const mongoHistoryAddGame = async (room: Room): Promise<void> => {
  const gameHistory: GameHistory = {
    gameId: room.currentGameId,
    roomCode: room.code,
    roomHost: room.host,
    board: room.masterBoard,
    startingPlayers: room.players,
    startingScores: room.scores,
    turns: []
  };
  await history?.insertOne(gameHistory);
};

/**
 * Adds new game history entry.
 * @param room
 */
const mongoHistoryEndGame = async (room: Room, endingScores: Scores): Promise<void> => {
  const gameHistory = await mongoHistoryGetGame(room.currentGameId);
  if (gameHistory) {
    gameHistory.endingPlayers = room.players;
    gameHistory.endingScores = endingScores;
    gameHistory.winner = findWinner(endingScores, room.turn);
    await history?.replaceOne({ gameId: room.currentGameId }, gameHistory);
  } else {
    throw "Error: could not find gameHistory in database when attempting to end this game.";
  }
};

/**
 * Gets a game history entry.
 * @param gameId
 */
const mongoHistoryGetGame = async (gameId: string): Promise<GameHistory | null | undefined> => {
  return (await history?.findOne({ gameId: gameId })) as GameHistory | null | undefined;
};

/**
 * Deletes a game history entry.
 * @param gameId
 */
const mongoHistoryDeleteGame = async (gameId: string): Promise<DeleteResult | undefined> => {
  return await history?.deleteOne({ gameId: gameId });
};

/**
 * Updates game history for last turn taken.
 * @param room
 * @param username
 * @param cell
 * @param turn
 */
const mongoHistoryAddTurn = async (room: Room, cell: CellData, username: string, turn: Color): Promise<void> => {
  const gameHistory = await mongoHistoryGetGame(room.currentGameId);
  if (gameHistory) {
    gameHistory.turns.push({
      cell,
      username,
      turn
    });
    await history?.replaceOne({ gameId: room.currentGameId }, gameHistory, { upsert: true });
  } else {
    throw "Error: could not find gameHistory in database when attempting to log this turn.";
  }
};

/**
 * Gets the promise queue for a specified room code.
 * @param roomCode
 */
const getQueue = (roomCode: string): Queue => {
  if (queues[roomCode] === undefined) {
    queues[roomCode] = new Queue({
      concurrent: 1,
      interval: 0
    });
  }

  return queues[roomCode];
};

/**
 * Updates chat for the room.
 * @param roomCode
 * @param message
 * @param username
 * @param team
 */
const updateChat = (roomCode: string, message: string, username: string, team: Team): void => {
  getQueue(roomCode).enqueue(async () => {
    io.to(roomCode + GUESSER_SUFFIX).emit("updateChat", message, username, team);
    io.to(roomCode + SPYMASTER_SUFFIX).emit("updateChat", message, username, team);
  });
};

/**
 * Updates game data for clients.
 * @param room
 */
const updateGame = (room: Room | null | undefined): void => {
  if (room) {
    const gameData: GameData = {
      board: room.publicBoard,
      players: room.players,
      scores: room.scores,
      turn: room.turn
    };

    // Update game for guessers and spymasters
    io.to(room.code + GUESSER_SUFFIX).emit("updateGame", gameData);
    io.to(room.code + SPYMASTER_SUFFIX).emit("updateGame", {
      ...gameData,
      board: room.masterBoard
    });
  }
};

/**
 * Finds scores for the board.
 * @param board
 */
const findScores = (board: BoardData): Scores => {
  const scores = { blue: 0, red: 0, gray: 0, black: 0 };
  board.forEach((cell) => {
    if (cell.revealed === false) {
      scores[cell.color as Color] += 1;
    }
  });

  return scores;
};

/**
 * Finds winner based on the scores and current turn.
 * @param scores
 * @param turn
 */
const findWinner = (scores: Scores, turn: Color): Team => {
  let winner: Team = Color.Gray;
  if (scores[Color.Black] !== BLACK_WORDS) {
    if (turn === Color.Blue) {
      winner = Color.Red;
    } else if (turn === Color.Red) {
      winner = Color.Blue;
    }
  } else if (scores[Color.Blue] === 0) {
    winner = Color.Blue;
  } else if (scores[Color.Red]) {
    winner = Color.Red;
  }

  return winner;
};

/**
 * Ends a team's turn.
 * @param roomCode
 */
const endTurn = async (roomCode: string): Promise<void> => {
  getQueue(roomCode).enqueue(async () => {
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const turn = room.turn === Color.Blue ? (room.turn = Color.Red) : (room.turn = Color.Blue);
      await mongoUpdateRoom(roomCode, { turn });
    }
  });
};

/**
 * Randomizes teams in a room.
 * @param roomCode
 */
const randomizeTeams = async (roomCode: string): Promise<void> => {
  getQueue(roomCode).enqueue(async () => {
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const players = shuffle(room.players);

      // Determine initial team color
      let evenTeam: Team = Color.Red;
      let oddTeam: Team = Color.Blue;

      if (Math.random() < 0.5) {
        oddTeam = Color.Red;
        evenTeam = Color.Blue;
      }

      // Assign new teams to players
      for (let i = 0; i < room.players.length; i++) {
        players[i].team = i % 2 === 0 ? evenTeam : oddTeam;
      }

      await mongoUpdateRoom(roomCode, { players });
    }
  });
};

/**
 * Reveals a cell on the public board.
 * @param roomCode
 * @param cellIndex
 */
const revealCell = (roomCode: string, cellIndex: number, username: string): void => {
  getQueue(roomCode).enqueue(async () => {
    const data: RecursivePartial<Room> & {
      publicBoard: RecursivePartial<BoardData>;
      masterBoard: RecursivePartial<BoardData>;
    } = { publicBoard: [], masterBoard: [] };

    const room = await mongoGetRoom(roomCode);
    if (room) {
      const player = room.players.find((player) => player.username === username);
      const cellColor = room.masterBoard[cellIndex].color as Color;
      const scores = findScores(room.masterBoard);
      if (player?.team === room.turn && room.scores[Color.Black] === BLACK_WORDS) {
        await mongoHistoryAddTurn(room, room.masterBoard[cellIndex], username, room.turn);

        // Update scores
        scores[cellColor] -= 1;
        data.scores = scores;

        // Whether the game is now over
        const gameOver = scores[Color.Blue] === 0 || scores[Color.Red] === 0 || cellColor === Color.Black;

        if (gameOver) {
          for (let i = 0; i < room.masterBoard.length; i++) {
            data.masterBoard[i] = merge(room.masterBoard[i], { mode: Mode.Endgame });
          }
          data.publicBoard = cloneDeep(data.masterBoard);
          await mongoHistoryEndGame(room, scores);
        } else {
          // Whether current turn is now over
          const turnOver = cellColor != room.turn;

          if (turnOver) {
            await endTurn(roomCode);
          }
        }

        // Update cell on public board
        data.publicBoard[cellIndex] = merge(data.publicBoard[cellIndex], {
          color: cellColor,
          revealed: true
        });

        // Update cell on master board
        data.masterBoard[cellIndex] = merge(data.masterBoard[cellIndex], {
          revealed: true
        });
      }

      await mongoUpdateRoom(roomCode, data);
    }
  });
};

/**
 * Reset a room by populating new game data.
 * @param unfinishedRoom
 */
const resetRoom = async (unfinishedRoom: UnfinishedRoom): Promise<void> => {
  const newRoom = cloneDeep(unfinishedRoom);
  newRoom.scores = { ...STARTING_SCORES };
  newRoom.turn = Color.Blue;
  newRoom.masterBoard = generateMasterBoard(STARTING_SCORES);
  newRoom.publicBoard = generatePublicBoard(newRoom.masterBoard);
  newRoom.players.forEach((player) => {
    player.mode = Mode.Normal;
    player.spoiled = false;
  });

  // Add current game ID by hashing the room
  newRoom.currentGameId = hashSync(JSON.stringify(newRoom), 2);

  // Update room
  await mongoUpdateRoom(newRoom.code, newRoom);

  // Add entry for game history
  await mongoHistoryAddGame(newRoom as Room);
};

// Setting up a connection to a client
io.on("connection", (socket) => {
  /**
   * Joins a room.
   * @param roomCode
   * @param username
   */
  const joinRoom = async (roomCode: string, username: string): Promise<void> => {
    const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const player = room.players.find((player) => player.username === username);
      // Check if username currently in use and connected, in use and disconncted, or not in use.
      if (player?.connected) {
        socket.emit("validJoin", false);
      } else {
        if (player) {
          data.players[room.players.length] = {
            connected: true
          };
        } else {
          data.players[room.players.length] = {
            username: username,
            mode: Mode.Normal,
            spoiled: false,
            team: Color.Gray,
            connected: true
          };
        }
        socket.data.roomCode = roomCode;
        socket.data.username = username;
        socket.join(roomCode + GUESSER_SUFFIX);
        socket.emit("validJoin", false);
        await mongoUpdateRoom(roomCode, data);
      }
    }
  };

  /**
   * Leaves a room.
   * @param roomCode
   * @param username
   */
  const leaveRoom = async (roomCode: string, username: string): Promise<void> => {
    const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const playerIndex = room.players.findIndex((player) => player.username === username);
      const player = room.players[playerIndex];
      if (player !== undefined) {
        data.players[playerIndex] = {
          connected: false
        };
      }

      socket.data.roomCode = undefined;
      socket.data.username = undefined;
      await mongoUpdateRoom(roomCode, data);
    }
  };

  /**
   * Creates a new room.
   * @param roomCode
   * @param host
   */
  const createRoom = async (roomCode: string, host: string): Promise<void> => {
    const unfinishedRoom: UnfinishedRoom = {
      code: roomCode,
      host: host,
      players: [],
      turn: Color.Blue
    };

    await resetRoom(unfinishedRoom);
    await joinRoom(roomCode, host);

    // Create queue for the new room
    getQueue(roomCode);
  };

  /**
   * Become a spymaster.
   * @param roomCode
   * @param username
   * @param suppressUpdate
   */
  const becomeSpymaster = async (roomCode: string, username: string, suppressUpdate = false): Promise<void> => {
    getQueue(roomCode).enqueue(async () => {
      const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
      const room = await mongoGetRoom(roomCode);
      if (room && socket.data.username === username) {
        const playerIndex = room.players.findIndex((player) => player.username === username);
        if (room.players[playerIndex] !== undefined) {
          data.players[playerIndex] = { mode: Mode.Spymaster, spoiled: true };
        }

        socket.leave(roomCode + GUESSER_SUFFIX);
        socket.join(roomCode + SPYMASTER_SUFFIX);

        if (suppressUpdate === false) {
          await mongoUpdateRoom(roomCode, data);
        }
      }
    });
  };

  /**
   * Become a guesser.
   * @param roomCode
   * @param username
   * @param suppressUpdate
   */
  const becomeGuesser = async (roomCode: string, username: string, suppressUpdate = false): Promise<void> => {
    getQueue(roomCode).enqueue(async () => {
      const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
      const room = await mongoGetRoom(roomCode);
      if (room) {
        const playerIndex = room.players.findIndex((player) => player.username === username);
        if (room.players[playerIndex] !== undefined) {
          data.players[playerIndex] = { mode: Mode.Normal };
        }

        socket.leave(roomCode + SPYMASTER_SUFFIX);
        socket.join(roomCode + GUESSER_SUFFIX);

        if (suppressUpdate === false) {
          await mongoUpdateRoom(roomCode, data);
        }
      }
    });
  };

  /**
   * Creates new game for room.
   * @param roomCode
   */
  const newGame = async (roomCode: string, username: string): Promise<void> => {
    getQueue(roomCode).enqueue(async () => {
      const room = await mongoGetRoom(roomCode);
      if (room && socket.data.username === username) {
        // Delete previous game history if it never finished
        const gameHistory = await mongoHistoryGetGame(room.currentGameId);
        if (!gameHistory?.winner) {
          await mongoHistoryDeleteGame(room.currentGameId);
        }

        const spymasterSockets = await io.in(roomCode + SPYMASTER_SUFFIX).fetchSockets();
        spymasterSockets.forEach((spymaster) => {
          spymaster.leave(roomCode + SPYMASTER_SUFFIX);
          spymaster.join(roomCode + GUESSER_SUFFIX);
        });
        await resetRoom(room);
      }
    });
  };

  /**
   * Creates or joins a room to enter.
   * @param roomCode
   * @param username
   */
  const enterRoom = async (roomCode: string, username: string): Promise<void> => {
    getQueue(roomCode).enqueue(async () => {
      const room = await mongoGetRoom(roomCode);
      if (!room) {
        await createRoom(roomCode, username);
      } else {
        await joinRoom(roomCode, username);
      }
    });
  };

  /**
   * Joins a team.
   * @param roomCode
   * @param username
   * @param team
   */
  const joinTeam = async (roomCode: string, username: string, team: Team): Promise<void> => {
    getQueue(roomCode).enqueue(async () => {
      const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
      const room = await mongoGetRoom(roomCode);
      if (room) {
        const playerIndex = room.players.findIndex((player) => player.username === username);
        if (room.players[playerIndex] !== undefined) {
          data.players[playerIndex] = { team: team };
        }

        await mongoUpdateRoom(roomCode, data);
      }
    });
  };

  // Add server listeners with callback functions
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("becomeGuesser", becomeGuesser);
  socket.on("newGame", newGame);
  socket.on("enterRoom", enterRoom);
  socket.on("leaveRoom", leaveRoom);
  socket.on("revealCell", revealCell);
  socket.on("joinTeam", joinTeam);
  socket.on("endTurn", endTurn);
  socket.on("randomizeTeams", randomizeTeams);
  socket.on("updateChat", updateChat);

  socket.on("disconnect", () => {
    leaveRoom(socket.data.roomCode, socket.data.username);
  });
});

io.engine.on("connection_error", (err: { req: any; code: any; message: any; context: any }) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

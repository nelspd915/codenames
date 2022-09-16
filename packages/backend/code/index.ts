import { Color, Mode, GameData, Room, UnfinishedRoom, Team, Scores, BoardData, CellData } from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard } from "./utils";
import { BLACK_WORDS, GUESSER_SUFFIX, SPYMASTER_SUFFIX, STARTING_SCORES } from "./constants";
import { setupServer } from "./server";
import { cloneDeep, shuffle } from "lodash";
import { Collection, Db, DeleteResult, UpdateResult, Document, InsertOneResult } from "mongodb";
import * as dotenv from "dotenv";
import Queue from "queue-promise";
import { GameHistory, Queues } from "./types";
import { setupMongoDatabase } from "./mongo";
import { hashSync } from "bcryptjs";

// Setup environment variables
dotenv.config();

// Setup promise queues
const queues: Queues = {};

// Setup MongoDB database
let rooms: Collection | undefined;
let history: Collection | undefined;
export let users: Collection | undefined;
setupMongoDatabase().then((db: Db | undefined) => {
  rooms = db?.collection("rooms");
  history = db?.collection("history");
  users = db?.collection("users");

  // Upon server start, remove all players from all rooms.
  rooms?.updateMany({}, { $set: { players: [] } });
});

// Setup IO server
const io = setupServer();

/**
 * Gets a room from the mongo database.
 * @param roomCode
 */
const mongoGetRoom = async (roomCode: string): Promise<Room> => {
  const room = (await rooms?.findOne({ code: roomCode })) as Room | null | undefined;
  if (room) {
    return room;
  } else {
    throw "Error: could not find room when attempting to get it from the database.";
  }
};

/**
 * Updates a room on the mongo database.
 * @param room
 */
const mongoUpdateRoom = async (room: Room): Promise<Document | UpdateResult | undefined> => {
  return await rooms?.replaceOne({ code: room.code }, room, { upsert: true });
};

/**
 * Adds new game history entry.
 * @param room
 */
const mongoHistoryAddGame = async (room: Room): Promise<InsertOneResult<Document> | undefined> => {
  const gameHistory: GameHistory = {
    gameId: room.currentGameId,
    roomCode: room.code,
    roomHost: room.host,
    board: room.masterBoard,
    startingPlayers: room.players,
    startingScores: room.scores,
    turns: []
  };
  return await history?.insertOne(gameHistory);
};

/**
 * Adds new game history entry.
 * @param room
 */
const mongoHistoryEndGame = async (room: Room): Promise<Document | UpdateResult | undefined> => {
  const gameHistory = await mongoHistoryGetGame(room.currentGameId);
  if (gameHistory) {
    gameHistory.board = room.masterBoard;
    gameHistory.endingPlayers = room.players;
    gameHistory.endingScores = room.scores;
    gameHistory.winner = findWinner(room);
    return await history?.replaceOne({ gameId: room.currentGameId }, gameHistory);
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
const mongoHistoryAddTurn = async (
  room: Room,
  cell: CellData,
  username: string,
  turn: Color
): Promise<Document | UpdateResult | undefined> => {
  const gameHistory = await mongoHistoryGetGame(room.currentGameId);
  if (gameHistory) {
    gameHistory.turns.push({
      cell,
      username,
      turn
    });
    return await history?.replaceOne({ gameId: room.currentGameId }, gameHistory, { upsert: true });
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
const updateGame = (room: Room): void => {
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
};

/**
 * Sets the currently loading cell.
 * @param roomCode
 * @param cellIndex
 */
const setLoadingCell = (roomCode: string, cellIndex: number): void => {
  io.to(roomCode + GUESSER_SUFFIX).emit("loadingCell", cellIndex);
  io.to(roomCode + SPYMASTER_SUFFIX).emit("loadingCell", cellIndex);
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
 * Finds winner for a room.
 * @param room
 */
const findWinner = (room: Room): Team => {
  const { scores, turn } = room;
  let winner: Team = Color.Gray;
  if (scores[Color.Black] !== BLACK_WORDS) {
    if (turn === Color.Blue) {
      winner = Color.Red;
    } else if (turn === Color.Red) {
      winner = Color.Blue;
    }
  } else if (scores[Color.Blue] === 0) {
    winner = Color.Blue;
  } else if (scores[Color.Red] === 0) {
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
    room.turn = room.turn === Color.Blue ? Color.Red : Color.Blue;
    updateGame(room);
    await mongoUpdateRoom(room);
  });
};

/**
 * Randomizes teams in a room.
 * @param roomCode
 */
const randomizeTeams = async (roomCode: string): Promise<void> => {
  getQueue(roomCode).enqueue(async () => {
    const room = await mongoGetRoom(roomCode);
    room.players = shuffle(room.players);

    // Determine initial team color
    let evenTeam: Team = Color.Red;
    let oddTeam: Team = Color.Blue;

    if (Math.random() < 0.5) {
      oddTeam = Color.Red;
      evenTeam = Color.Blue;
    }

    // Assign new teams to players
    for (let i = 0; i < room.players.length; i++) {
      room.players[i].team = i % 2 === 0 ? evenTeam : oddTeam;
    }

    updateGame(room);
    await mongoUpdateRoom(room);
  });
};

/**
 * Reveals a cell on the public board.
 * @param roomCode
 * @param cellIndex
 */
const revealCell = (roomCode: string, cellIndex: number, username: string): void => {
  // Set the loading cell immediately
  setLoadingCell(roomCode, cellIndex);

  getQueue(roomCode).enqueue(async () => {
    const room = await mongoGetRoom(roomCode);
    const player = room.players.find((player) => player.username === username);

    if (
      player?.team === room.turn &&
      room.scores[Color.Black] === BLACK_WORDS &&
      room.scores[Color.Blue] !== 0 &&
      room.scores[Color.Red] !== 0 &&
      room.publicBoard[cellIndex].revealed === false
    ) {
      const origTurn = room.turn;
      const cellColor = room.masterBoard[cellIndex].color as Color;

      // Update cell on public board
      room.publicBoard[cellIndex].color = cellColor;
      room.publicBoard[cellIndex].revealed = true;

      // Update cell on master board
      room.masterBoard[cellIndex].revealed = true;

      // Update scores
      room.scores = findScores(room.masterBoard);

      // Whether the game is now over
      const gameOver = room.scores[Color.Blue] === 0 || room.scores[Color.Red] === 0 || cellColor === Color.Black;

      if (gameOver) {
        for (let i = 0; i < room.masterBoard.length; i++) {
          room.masterBoard[i].mode = Mode.Endgame;
        }
        room.publicBoard = cloneDeep(room.masterBoard);
      } else {
        // Whether current turn is now over
        const turnOver = cellColor != room.turn;

        if (turnOver) {
          room.turn = player.team === Color.Blue ? Color.Red : Color.Blue;
        }
      }

      // Update game for clients
      updateGame(room);

      // Clear the loading cell
      setLoadingCell(roomCode, -1);

      // Update database
      await mongoUpdateRoom(room);
      await mongoHistoryAddTurn(room, room.masterBoard[cellIndex], username, origTurn);
      if (gameOver) {
        await mongoHistoryEndGame(room);
      }
    }
  });
};

/**
 * Reset the game data for a room.
 * @param currentRoom
 */
const resetGame = async (currentRoom: UnfinishedRoom | Room): Promise<void> => {
  const newRoom = cloneDeep(currentRoom);
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

  // Update game for clients
  updateGame(newRoom as Room);

  // Update room
  await mongoUpdateRoom(newRoom as Room);

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
    const room = await mongoGetRoom(roomCode);
    const player = room.players.find((player) => player.username === username);

    if (player?.connected) {
      // Reject join if username is currently in use already (it exists and is connected)
      socket.emit("validJoin", false);
    } else {
      // When username is not connected...
      if (player) {
        // If player exists, set them as "connected"
        player.connected = true;
      } else {
        // If player does not exist, make the new player
        room.players.push({
          username: username,
          mode: Mode.Normal,
          spoiled: false,
          team: Color.Gray,
          connected: true
        });
      }

      // Add socket data
      socket.data.roomCode = roomCode;
      socket.data.username = username;

      // Since username was not in use already, allow join
      socket.join(roomCode + GUESSER_SUFFIX);
      socket.emit("validJoin", false);

      updateGame(room);
      await mongoUpdateRoom(room);
    }
  };

  /**
   * Leaves a room.
   * @param roomCode
   * @param username
   */
  const leaveRoom = async (roomCode: string, username: string): Promise<void> => {
    console.log("Socket disconnected: ", socket.data);

    const room = await mongoGetRoom(roomCode);
    const player = room.players.find((player) => player.username === username);
    if (player !== undefined) {
      player.connected = false;
    }

    // Remove socket data
    delete socket.data.roomCode;
    delete socket.data.username;

    updateGame(room);
    await mongoUpdateRoom(room);
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

    await resetGame(unfinishedRoom);
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
      const room = await mongoGetRoom(roomCode);
      if (socket.data.username === username) {
        const player = room.players.find((player) => player.username === username);
        if (player !== undefined) {
          player.mode = Mode.Spymaster;
          player.spoiled = true;
        }

        // Move player's socket from guesser to spymaster
        socket.leave(roomCode + GUESSER_SUFFIX);
        socket.join(roomCode + SPYMASTER_SUFFIX);

        if (suppressUpdate === false) {
          updateGame(room);
          await mongoUpdateRoom(room);
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
      const room = await mongoGetRoom(roomCode);
      const player = room.players.find((player) => player.username === username);
      if (player !== undefined) {
        player.mode = Mode.Normal;
      }

      // Move player's socket from spymaster to guesser
      socket.leave(roomCode + SPYMASTER_SUFFIX);
      socket.join(roomCode + GUESSER_SUFFIX);

      if (suppressUpdate === false) {
        updateGame(room);
        await mongoUpdateRoom(room);
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
      if (socket.data.username === username) {
        // Delete previous game history if it never finished
        const gameHistory = await mongoHistoryGetGame(room.currentGameId);
        if (!gameHistory?.winner) {
          await mongoHistoryDeleteGame(room.currentGameId);
        }

        // Move all spymasters back to guesser
        const spymasterSockets = await io.in(roomCode + SPYMASTER_SUFFIX).fetchSockets();
        spymasterSockets.forEach((spymaster) => {
          spymaster.leave(roomCode + SPYMASTER_SUFFIX);
          spymaster.join(roomCode + GUESSER_SUFFIX);
        });

        // Remove all disconnected players
        room.players = room.players.filter((player) => player.connected === true);

        // Reset game
        await resetGame(room);
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
      const roomExists = (await rooms?.findOne({ code: roomCode })) ? true : false;
      if (roomExists) {
        await joinRoom(roomCode, username);
      } else {
        await createRoom(roomCode, username);
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
      const room = await mongoGetRoom(roomCode);
      const player = room.players.find((player) => player.username === username);
      if (player !== undefined) {
        player.team = team;
      }

      updateGame(room);
      await mongoUpdateRoom(room);
    });
  };

  /**
   * Disconnects a client.
   */
  const disconnect = async (): Promise<void> => {
    const roomExists = (await rooms?.findOne({ code: socket.data.roomCode })) ? true : false;
    if (roomExists) {
      leaveRoom(socket.data.roomCode, socket.data.username);
    }
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
  socket.on("disconnect", disconnect);
});

io.engine.on("connection_error", (err: { req: any; code: any; message: any; context: any }) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

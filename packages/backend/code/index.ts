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
  BoardData
} from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard } from "./utils";
import { GUESSER_SUFFIX, SPYMASTER_SUFFIX, STARTING_SCORES } from "./constants";
import { setupServer } from "./server";
import { cloneDeep, merge, shuffle } from "lodash";
import { AnyError, Collection, Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

// Setup environment variables
dotenv.config();

// Setup server
const io = setupServer();

// Setup MongoDB database
let db: Db | undefined;
let rooms: Collection | undefined;
const localUrl = `mongodb://0.0.0.0:27017/`;
const atlasUrl = `mongodb+srv://codenames:${process.env.MONGO_PASSWORD}@codenames.z041u.mongodb.net/?retryWrites=true&w=majority`;
const mongoUrl = process.argv[2] === "dev" ? localUrl : atlasUrl;
MongoClient.connect(mongoUrl, (err?: AnyError, mongoClient?: MongoClient) => {
  if (err !== undefined) {
    throw err;
  } else {
    db = mongoClient?.db("codenamesdb");
    rooms = db?.collection("rooms");
  }
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
  const currentRoom = (await rooms?.findOne({ code: roomCode })) ?? {};
  const newRoom = merge(currentRoom, data) as Room;
  await rooms?.replaceOne({ code: roomCode }, newRoom, { upsert: true });

  updateGame(newRoom);
};

/**
 * Updates chat for the room.
 * @param roomCode
 * @param message
 * @param username
 * @param team
 */
const updateChat = (roomCode: string, message: string, username: string, team: Team): void => {
  io.to(roomCode + GUESSER_SUFFIX).emit("updateChat", message, username, team);
  io.to(roomCode + SPYMASTER_SUFFIX).emit("updateChat", message, username, team);
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
 * Updates scores for the board.
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
 * Ends a team's turn.
 * @param roomCode
 */
const endTurn = async (roomCode: string): Promise<void> => {
  const room = await mongoGetRoom(roomCode);
  if (room) {
    const turn = room.turn === Color.Blue ? (room.turn = Color.Red) : (room.turn = Color.Blue);
    await mongoUpdateRoom(roomCode, { turn });
  }
};

/**
 * Randomize teams in a room.
 * @param roomCode
 */
const randomizeTeams = async (roomCode: string): Promise<void> => {
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
};

/**
 * Reveals a cell on the public board.
 * @param roomCode
 * @param cellIndex
 */
const revealCell = async (roomCode: string, cellIndex: number, username: string): Promise<void> => {
  const data: RecursivePartial<Room> & {
    publicBoard: RecursivePartial<BoardData>;
    masterBoard: RecursivePartial<BoardData>;
  } = { publicBoard: [], masterBoard: [] };

  const room = await mongoGetRoom(roomCode);
  if (room) {
    const player = room.players.find((player) => player.username === username);
    const cellColor = room.masterBoard[cellIndex].color as Color;
    const scores = findScores(room.masterBoard);
    if (player?.team === room.turn) {
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

  await mongoUpdateRoom(newRoom.code, newRoom);
};

// Setting up a connection to a client
io.on("connection", (socket) => {
  // Callback function to join a room
  const joinRoom = async (roomCode: string, username: string): Promise<void> => {
    const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const player = room.players.find((player) => player.username === username);
      if (player === undefined) {
        data.players[room.players.length] = {
          username: username,
          mode: Mode.Normal,
          spoiled: false,
          team: Color.Gray
        };
      }

      if ((player?.mode ?? Mode.Normal) === Mode.Spymaster) {
        socket.join(roomCode + SPYMASTER_SUFFIX);
      } else {
        socket.join(roomCode + GUESSER_SUFFIX);
      }

      await mongoUpdateRoom(roomCode, data);
    }
  };

  // Callback function to create a new room
  const createRoom = async (roomCode: string, host: string): Promise<void> => {
    const unfinishedRoom: UnfinishedRoom = {
      code: roomCode,
      host: host,
      players: [],
      turn: Color.Blue
    };

    await resetRoom(unfinishedRoom);
    await joinRoom(roomCode, host);
  };

  // Callback function to become a spymaster
  const becomeSpymaster = async (roomCode: string, username: string, suppressUpdate = false): Promise<void> => {
    const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
    const room = await mongoGetRoom(roomCode);
    if (room) {
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
  };

  /**
   * Become a guesser.
   * @param roomCode
   * @param username
   */
  const becomeGuesser = async (roomCode: string, username: string, suppressUpdate = false): Promise<void> => {
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
  };

  /**
   * Creates new game for room.
   * @param roomCode
   */
  const newGame = async (roomCode: string): Promise<void> => {
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const spymasterSockets = await io.in(roomCode + SPYMASTER_SUFFIX).fetchSockets();
      spymasterSockets.forEach((spymaster) => {
        spymaster.leave(roomCode + SPYMASTER_SUFFIX);
        spymaster.join(roomCode + GUESSER_SUFFIX);
      });
      await resetRoom(room);
    }
  };

  /**
   * Creates or joins a room to enter.
   * @param roomCode
   * @param username
   */
  const enterRoom = async (roomCode: string, username: string): Promise<void> => {
    const room = await mongoGetRoom(roomCode);
    if (!room) {
      await createRoom(roomCode, username);
    } else {
      await joinRoom(roomCode, username);
    }
  };

  /**
   * Joins a team.
   * @param roomCode
   * @param username
   * @param team
   */
  const joinTeam = async (roomCode: string, username: string, team: Team): Promise<void> => {
    const data: RecursivePartial<Room> & { players: RecursivePartial<PlayerData> } = { players: [] };
    const room = await mongoGetRoom(roomCode);
    if (room) {
      const playerIndex = room.players.findIndex((player) => player.username === username);
      if (room.players[playerIndex] !== undefined) {
        data.players[playerIndex] = { team: team };
      }

      await mongoUpdateRoom(roomCode, data);
    }
  };

  // Add server listeners with callback functions
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("becomeGuesser", becomeGuesser);
  socket.on("newGame", newGame);
  socket.on("enterRoom", enterRoom);
  socket.on("revealCell", revealCell);
  socket.on("joinTeam", joinTeam);
  socket.on("endTurn", endTurn);
  socket.on("randomizeTeams", randomizeTeams);
  socket.on("updateChat", updateChat);
});

io.engine.on("connection_error", (err: { req: any; code: any; message: any; context: any }) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

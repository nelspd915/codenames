import {
  Color,
  Mode,
  PlayerData,
  GameData,
  Room,
  Rooms,
  UnfinishedRoom,
} from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard } from "./utils";
import { GUESSER_SUFFIX, SPYMASTER_SUFFIX, STARTING_SCORES } from "./constants";
import { setupServer } from "./server";
import { cloneDeep } from "lodash";

// Setup server
const io = setupServer();

// Initialize storage
const allPlayers: PlayerData[] = [];
const rooms: Rooms = {};

/**
 * Broadcasts a game update for entire room.
 */
const updateGameForRoom = (room: Room): void => {
  const gameData: GameData = {
    board: room.publicBoard,
    players: room.players,
    scores: room.scores,
  };

  // Update game for guessers and spymasters
  io.to(room.code + GUESSER_SUFFIX).emit("updateGame", gameData);
  io.to(room.code + SPYMASTER_SUFFIX).emit("updateGame", {
    ...gameData,
    board: room.masterBoard,
  });
};

/**
 * Reveals a cell on the public board.
 * @param roomCode
 * @param cellIndex
 */
const revealCell = (roomCode: string, cellIndex: number): void => {
  const room = rooms[roomCode];
  const cellColor = room.masterBoard[cellIndex].color as Color;
  room.publicBoard[cellIndex].color = cellColor;
  room.publicBoard[cellIndex].revealed = true;
  room.masterBoard[cellIndex].revealed = true;
  if (room.scores[cellColor] !== undefined) {
    room.scores[cellColor] -= 1;
  }

  // Whether the game is now over
  const gameOver =
    room.scores[Color.Blue] === 0 ||
    room.scores[Color.Red] === 0 ||
    cellColor === Color.Black;

  console.log("go", gameOver);

  if (gameOver) {
    room.masterBoard.forEach((cell) => {
      cell.mode = Mode.Endgame;
    });
    room.publicBoard = room.masterBoard;
  }

  updateGameForRoom(room);
};

/**
 * Reset a room by populating new game data.
 */
const resetRoom = (partialRoom: UnfinishedRoom): Room => {
  const newRoom = cloneDeep(partialRoom);
  newRoom.scores = { ...STARTING_SCORES };
  newRoom.masterBoard = generateMasterBoard(STARTING_SCORES);
  newRoom.publicBoard = generatePublicBoard(newRoom.masterBoard);
  newRoom.players.forEach((player) => {
    player.mode = Mode.Normal;
    player.spoiled = false;
  });
  return newRoom as Room;
};

// Setting up a connection to a client
io.on("connection", (socket) => {
  // Callback function to join a room
  const joinRoom = (roomCode: string, username: string) => {
    socket.join(roomCode + GUESSER_SUFFIX);
    const room = rooms[roomCode];
    const player = room.players.find((player) => player.username === username);
    if (player === undefined) {
      room.players.push({
        username: username,
        mode: Mode.Normal,
        spoiled: false,
        team: Color.Blue,
      });
    }

    updateGameForRoom(room);
  };

  // Callback function to create a new room
  const createRoom = (roomCode: string, host: string): void => {
    const unfinishedRoom: UnfinishedRoom = {
      code: roomCode,
      host: host,
      players: [],
    };
    rooms[roomCode] = resetRoom(unfinishedRoom);
    joinRoom(roomCode, host);
  };

  // Callback function to become a spymaster
  const becomeSpymaster = (
    roomCode: string,
    username: string,
    suppressUpdate = false
  ): void => {
    socket.leave(roomCode + GUESSER_SUFFIX);
    socket.join(roomCode + SPYMASTER_SUFFIX);
    const room = rooms[roomCode];
    const player = room.players.find((player) => player.username === username);
    if (player !== undefined) {
      player.mode = Mode.Spymaster;
      player.spoiled = true;
    }

    if (suppressUpdate === false) {
      updateGameForRoom(room);
    }
  };

  /**
   * Become a guesser.
   * @param roomCode
   * @param username
   */
  const becomeGuesser = (
    roomCode: string,
    username: string,
    suppressUpdate = false
  ): void => {
    socket.leave(roomCode + SPYMASTER_SUFFIX);
    socket.join(roomCode + GUESSER_SUFFIX);
    const room = rooms[roomCode];
    const player = room.players.find((player) => player.username === username);
    if (player !== undefined) {
      player.mode = Mode.Normal;
    }

    if (suppressUpdate === false) {
      updateGameForRoom(room);
    }
  };

  /**
   * Creates new game for room.
   * @param roomCode
   */
  const newGame = (roomCode: string): void => {
    rooms[roomCode] = resetRoom(rooms[roomCode]);
    rooms[roomCode].players.forEach((player) => {
      if (player.username !== undefined) {
        becomeGuesser(roomCode, player.username, true);
      }
    });
    updateGameForRoom(rooms[roomCode]);
  };

  /**
   * Creates or joins a room to enter.
   * @param roomCode
   * @param username
   */
  const enterRoom = (roomCode: string, username: string): void => {
    if (rooms[roomCode] === undefined) {
      createRoom(roomCode, username);
    }

    joinRoom(roomCode, username);

    updateGameForRoom(rooms[roomCode]);
  };

  // Add server listeners with callback functions
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("becomeGuesser", becomeGuesser);
  socket.on("newGame", newGame);
  socket.on("enterRoom", enterRoom);
  socket.on("revealCell", revealCell);
});

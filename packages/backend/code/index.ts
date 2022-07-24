import { Color, GameData, Lobbies, Mode, PlayerData, Scores } from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard, updateGameForPlayer } from "./utils";
import { BLACK_WORDS, BLUE_WORDS, GRAY_WORDS, RED_WORDS } from "./constants";
import { setupServer } from "./server";

// Setup server
const io = setupServer();

// Starting scores
const scores: Scores = {
  [Color.Blue]: BLUE_WORDS,
  [Color.Red]: RED_WORDS,
  [Color.Gray]: GRAY_WORDS,
  [Color.Black]: BLACK_WORDS
};


// Initialize storage
const allPlayers: PlayerData[] = [];
const rooms: Lobbies = {};

/** 
 * Updates player username.
 * @param socketId
 * @param username
 */
const updateUsername = (socketId: string, username: string): void => {
  const player = allPlayers.find((eachPlayer) => eachPlayer.socket.id === socketId);

  // Find old cached player data with the same username if it exists
  const oldPlayerIndex = allPlayers.findIndex((eachPlayer) => {
    return (
      eachPlayer.username === username &&
      eachPlayer.socket.id !== socketId
    );
  });
  const oldPlayer = allPlayers[oldPlayerIndex];

  if (player !== undefined) {
    player.username = username;

    // If there was a previous user cached, bring back their data
    if (oldPlayer !== undefined) {
      player.mode = oldPlayer.mode;
      player.team = oldPlayer.team;
      
      // Remove old player
      allPlayers.splice(oldPlayerIndex, 1);
    }
  }
}

/**
 * Creates new game for room.
 */
const newGame = (code: string): void => {
  rooms[code].scores = scores;
  const masterBoard = generateMasterBoard(BLUE_WORDS, RED_WORDS, GRAY_WORDS, BLACK_WORDS);
  const publicBoard = generatePublicBoard(masterBoard);
  rooms[code].masterBoard = masterBoard;
  rooms[code].publicBoard = publicBoard;
  const gameData: GameData = {
    board: rooms[code].publicBoard,
    scores: rooms[code].scores
  };
  io.to(code).emit("updateGame", gameData);
}

// Setting up a connection to a client
io.on("connection", (socket) => {
  // Add socket to list
  const newPlayer = {
    socket: socket,
    mode: Mode.Normal
  };
  allPlayers.push(newPlayer);

  // Add server listener and callback function for revealCell
  socket.on("revealCell", (cellIndex: number, code: string) => {
    const color = rooms[code].masterBoard[cellIndex].color as Color;
    rooms[code].publicBoard[cellIndex].color = color;
    rooms[code].publicBoard[cellIndex].revealed = true;
    rooms[code].masterBoard[cellIndex].revealed = true;
    if (rooms[code].scores[color] !== undefined) {
      rooms[code].scores[color] -= 1;
    }
    let gameData: GameData = {
      board: rooms[code].publicBoard,
      scores: rooms[code].scores
    };
    socket.to(code).emit("updateGame", gameData);
    socket.emit("updateGame", gameData);
    if (rooms[code].scores[color] === 0 && color !== Color.Gray) {
      rooms[code].publicBoard.forEach((cell) => {
        cell.revealed = true;
        cell.mode = Mode.Endgame;
      });
      rooms[code].masterBoard.forEach((cell) => {
        cell.mode = Mode.Endgame;
      });
    }
    gameData.board = rooms[code].publicBoard;
    socket.to(code).emit("updateGame", gameData);
    socket.emit("updateGame", gameData);
    gameData.board = rooms[code].masterBoard;
    socket.to(code + "spymaster").emit("updateGame", gameData);
  });

  // Add server listener and callback function for becomeSpymaster
  socket.on("becomeSpymaster", (username: string, code: string) => {
    socket.join(code + "spymaster");
    let gameData: GameData = {
      board: rooms[code].masterBoard,
      scores: rooms[code].scores
    };
    socket.emit("updateGame", gameData);
  });
  socket.on("updateUsername", updateUsername);
  socket.on("newGame", newGame);
  socket.on("createRoom", (code: string, host: string) => {
    socket.join(code);
    const masterBoard = generateMasterBoard(BLUE_WORDS, RED_WORDS, GRAY_WORDS, BLACK_WORDS);
    const publicBoard = generatePublicBoard(masterBoard);
    // Starting scores
    const scores: Scores = {
      [Color.Blue]: BLUE_WORDS,
      [Color.Red]: RED_WORDS,
      [Color.Gray]: GRAY_WORDS,
      [Color.Black]: BLACK_WORDS
    };
    rooms[code] = {
      code: code,
      host: host,
      masterBoard: masterBoard,
      publicBoard: publicBoard,
      scores: scores
    }
    const gameData: GameData = {
      board: publicBoard,
      scores: scores
    };
    socket.emit("updateGame", gameData);
  });

  // Add server listener and callback function for joinRoom
  socket.on("joinRoom", (code: string, username: string) => {
    const gameData: GameData = {
      board: rooms[code].publicBoard,
      scores: rooms[code].scores
    };
    socket.join(code);
    socket.emit("updateGame", gameData);
  });

  // Pass the game data to the new client
  // updateGameForPlayer(newPlayer, masterBoard, publicBoard, scores);
});
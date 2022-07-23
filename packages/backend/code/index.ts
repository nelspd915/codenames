import { Color, Mode, PlayerData, Scores } from "codenames-frontend";
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

// Starting game board
let masterBoard = generateMasterBoard(BLUE_WORDS, RED_WORDS, GRAY_WORDS, BLACK_WORDS);
let publicBoard = generatePublicBoard(masterBoard);

const allPlayers: PlayerData[] = [];

/**
 * Reveals a cell on the public board.
 * @param cellIndex 
 */
const revealCell = (cellIndex: number): void => {
  const color = masterBoard[cellIndex].color;
  publicBoard[cellIndex].color = color;
  publicBoard[cellIndex].revealed = true;
  masterBoard[cellIndex].revealed = true;
  if (color !== undefined) {
    scores[color] -= 1;
  }
  allPlayers.forEach((player) => {
    updateGameForPlayer(player, masterBoard, publicBoard, scores);
  });
};

/**
 * Updates player mode to spymaster and emits masterboard to them.
 * @param username
 */
const becomeSpymaster = (username: string): void => {
  const player = allPlayers.find((player) => player.username === username);
  if (player !== undefined) {
    player.mode = Mode.Spymaster;
    updateGameForPlayer(player, masterBoard, publicBoard, scores);
  }
}

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

      // Update game in case mode changed
      updateGameForPlayer(player, masterBoard, publicBoard, scores);
      
      // Remove old player
      allPlayers.splice(oldPlayerIndex, 1);
    }
  }
}

/**
 * Creates new game for room.
 */
const newGame = (): void => {
  scores.blue = BLUE_WORDS;
  scores.red = RED_WORDS;
  masterBoard = generateMasterBoard(BLUE_WORDS, RED_WORDS, GRAY_WORDS, BLACK_WORDS);
  publicBoard = generatePublicBoard(masterBoard);
  allPlayers.forEach((player) => {
    player.mode = Mode.Normal;
    delete player.team;
    updateGameForPlayer(player, masterBoard, publicBoard, scores);
  });
}

// Setting up a connection to a client
io.on("connection", (socket) => {
  // Add socket to list
  const newPlayer = {
    socket: socket,
    mode: Mode.Normal
  };
  allPlayers.push(newPlayer);
  // Add server listener for revealCell
  socket.on("revealCell", revealCell);
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("updateUsername", updateUsername);
  socket.on("newGame", newGame);

  // Pass the game data to the new client
  updateGameForPlayer(newPlayer, masterBoard, publicBoard, scores);
});
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { Mode, PlayerData } from "codenames-frontend";

// Fetch master gameboard data
import { generateMasterBoard, generatePublicBoard, updateBoardForPlayer } from "./utils";
let masterBoard = generateMasterBoard(9, 8, 7, 1);
let publicBoard = generatePublicBoard(masterBoard);

// Initialize and configure server
const app = express();
const server = http.createServer(app);
const EXPRESS_PORT: number = parseInt(process.env.PORT ?? "8080");

// Initialize web sockets with socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3333", "https://nelspd915.github.io"],
  },
});

const allPlayers: PlayerData[] = [];

/**
 * Reveals a cell on the public board.
 * @param cellIndex 
 */
const revealCell = (cellIndex: number): void => {
  publicBoard[cellIndex].color = masterBoard[cellIndex].color;
  publicBoard[cellIndex].revealed = true;
  masterBoard[cellIndex].revealed = true;
  allPlayers.forEach((player) => {
    updateBoardForPlayer(player, masterBoard, publicBoard);
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
    updateBoardForPlayer(player, masterBoard, publicBoard);
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

      // Update board in case mode changed
      updateBoardForPlayer(player, masterBoard, publicBoard);
      
      // Remove old player
      allPlayers.splice(oldPlayerIndex, 1);
    }
  }
}

/**
 * Creates new game for room.
 */
const newGame = (): void => {
  masterBoard = generateMasterBoard(9, 8, 7, 1);
  publicBoard = generatePublicBoard(masterBoard);
  allPlayers.forEach((player) => {
    player.mode = Mode.Normal;
    delete player.team;
    updateBoardForPlayer(player, masterBoard, publicBoard);
  });
}

function printPlayers() {
  
  console.log("playersss:", allPlayers.map(player => {
    return {
      id: player.socket.id,
      username: player.username,
      mode: player.mode,
      team: player.team
    }
  }));
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

  // Pass the board data to the new client
  updateBoardForPlayer(newPlayer, masterBoard, publicBoard);
});

// Initialize middleware for server
app.use(express.json());
app.use(cors());

// Open server to listen for requests
server.listen(EXPRESS_PORT, () =>
  console.log(`server live on http://localhost:${EXPRESS_PORT}`)
);

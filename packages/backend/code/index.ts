import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { Mode, PlayerData } from "codenames-frontend";

// Fetch master gameboard data
import { generateMasterBoard, generatePublicBoard } from "./utils";
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

// Reveals a cell on the public board
const revealCell = (cellIndex: number): void => {
  publicBoard[cellIndex].color = masterBoard[cellIndex].color;
  publicBoard[cellIndex].revealed = true;
  masterBoard[cellIndex].revealed = true;
  allPlayers.forEach((player) => {
    if (player.mode === Mode.Spymaster) {
      player.socket.emit("updateBoard", masterBoard);
    } else {
      player.socket.emit("updateBoard", publicBoard);
    }
  });
};

// Updates player mode to spymaster and emits masterboard to them
const becomeSpymaster = (username: string): void => {
  const player = allPlayers.find((player) => player.username === username);
  if (player !== undefined) {
    player.mode = Mode.Spymaster;
    player.socket.emit("updateBoard", masterBoard);
  }
}

// Updates player username
const updateUsername = (socketId: string, username: string): void => {
  console.log(username);
  const player = allPlayers.find((player) => player.socket.id === socketId);
  if (player !== undefined) {
    player.username = username;
  }
}

// Creates new game for room
const newGame = (): void => {
  masterBoard = generateMasterBoard(9, 8, 7, 1);
  publicBoard = generatePublicBoard(masterBoard);
  allPlayers.forEach((player) => {
    player.mode = Mode.Normal;
    delete player.team;
    player.socket.emit("newGame", publicBoard);
  });
}

// Upon client establishing a socket connection
io.on("connection", (socket) => {
  // Add socket to list
  allPlayers.push({
    socket: socket,
    mode: Mode.Normal
  });
  // Add server listener for revealCell
  socket.on("revealCell", revealCell);
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("updateUsername", updateUsername);
  socket.on("newGame", newGame);
  // Pass the board data to the new client
  socket.emit("updateBoard", publicBoard);
});

// Initialize middleware for server
app.use(express.json());
app.use(cors());

// Open server to listen for requests
server.listen(EXPRESS_PORT, () =>
  console.log(`server live on http://localhost:${EXPRESS_PORT}`)
);

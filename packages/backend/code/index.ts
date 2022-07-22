import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { BoardData, CellData, CellMode } from "codenames-frontend";

// Fetch master gameboard data
import gameboard2 from "./data/gameboard2.json";
const masterBoard = gameboard2 as BoardData;

// Initialize and configure server
const app = express();
const EXPRESS_PORT: number = parseInt(process.env.PORT ?? "8080");
const SOCKET_PORT: number = 8000;

// Initialize web sockets with socket.io
const io = new Server(SOCKET_PORT, {
    cors: {
        origin: ["http://localhost:3333", "https://nelspd915.github.io/codenames"]
    }
});

// Removes sensitive color info from the board data for the public board
const publicBoard: BoardData = masterBoard.map((masterCell) => {
    const publicCell: CellData = {
        word: masterCell.word,
        mode: CellMode.Normal,
        revealed: false
    };
    return publicCell;
});

const allSockets: Socket[] = [];

// Reveals a cell on the public board
const revealCell = (cellIndex: number): void => {
    publicBoard[cellIndex].color = masterBoard[cellIndex].color;
    publicBoard[cellIndex].revealed = true;
    allSockets.forEach((socket) => {
        socket.emit("updateBoard", publicBoard);
    });
}

// Upon client establishing a socket connection
io.on("connection", (socket) => {
    // Add socket to list
    allSockets.push(socket);
    // Add server listener for revealCell
    socket.on("revealCell", revealCell);
    // Pass the board data to the new client
    socket.emit("updateBoard", publicBoard);
});

// Initialize middleware for server
app.use(express.json());
app.use(cors());

// Open server to listen for requests
app.listen(
    EXPRESS_PORT,
    () => console.log(`server live on http://localhost:${EXPRESS_PORT}`)
);

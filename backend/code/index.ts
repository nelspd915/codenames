import express from "express";
import cors from "cors";
import { Server } from "socket.io";

// Fetch gameboard data
import gameboard from "./data/gameboard.json";

// Initialize and configure server
const app = express();
const EXPRESS_PORT: number = 8080;
const SOCKET_PORT: number = 8000;

// Initialize web sockets with socket.io
const io = new Server(SOCKET_PORT, {
    cors: {
        origin: ["http://localhost:3333"]
    }
});

io.on("connection", (socket) => {
    socket.on("revealCell", (cell) => {
        console.log(cell);
    });
});

// Initialize middleware for server
app.use(express.json());
app.use(cors());

// Api routes
app.get("/gameboard", (req, res) => {
    res.status(200).send(gameboard);
});

// Open server to listen for requests
app.listen(
    EXPRESS_PORT,
    () => console.log(`server live on http://localhost:${EXPRESS_PORT}`)
);

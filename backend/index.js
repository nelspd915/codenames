// Initialize and configure server
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

// Initialize middleware for server
app.use(express.json());
app.use(cors());

// Fetch gameboard data
const gameBoard = require("./gameboard");

// Api routes
app.get("/gameboard", (req, res) => {
    res.status(200).send(gameBoard);
})

// Open server to listen for requests
app.listen(
    PORT,
    () => console.log(`server live on http://localhost:${PORT}`)
);
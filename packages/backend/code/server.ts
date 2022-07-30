import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { users } from ".";
import { User } from "codenames-frontend";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/**
 * Sets up server environment and returns the socket IO.
 */

export function setupServer(): Server {
  // Initialize and configure server
  const app = express();
  const server = http.createServer(app);
  const EXPRESS_PORT: number = parseInt(process.env.PORT ?? "8080");

  // Initialize web sockets with socket.io
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3333", "https://nelspd915.github.io"]
    }
  });

  // Initialize middleware for server
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3333", "https://nelspd915.github.io"]
    })
  );

  // Api routes
  app.get("/test", (req, res) => {
    const authHeader = req.headers["authorization"] as string;
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(user.username);
      }
    });
  });

  app.post("/register", async (req, res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.passwordOne, 10);
    const user = users.find(user => user.username === username);
    const samePass = req.body.passwordOne === req.body.passwordTwo;

    if (user === undefined) {
      if (samePass) {
        const newUser: User = {
          username: username,
          password: hashedPassword,
          verified: true,
          matchHistory: []
        };
        users.push(newUser);
        res.status(201).send("success");
      } else {
        res.status(401).send("Passwords do not match");
      }
    } else if (user.verified) {
      res.status(401).send("User with this name already exists");
    } else {
      if (samePass) {
        user.verified = true;
        user.password = hashedPassword;
        res.status(201).send("success");
      } else {
        res.status(401).send("Passwords do not match");
      }
    }
  });

  app.post("/login", async (req, res) => {
    const user = users.find(user => user.username === req.body.username);

    if (user !== undefined && user.verified) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string, {
          expiresIn: "15m"
        });
        const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET as string, {
          expiresIn: "30d"
        });
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.status(401).send("Incorrect Password");
      }
    } else {
      res.status(401).send("user doesnt exists or name already taken");
    }
  });

  app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === undefined) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "15m"
      });
      res.json({ accessToken: accessToken });
    });
  });

  app.get("/winrate", (req, res) => {
    const user = users.find((user) => req.body.username === user.username);
    if (user !== undefined) {
      let wins = 0;
      let losses = 0;
      user.matchHistory.forEach((match) => {
        const player = match.players.find((player) => user.username === player.username);
        if (player?.team === match.winner) {
          wins += 1;
        } else {
          losses += 1;
        }
      });
      return res.json({ winrate: (wins / (wins + losses) * 100)});
    } else {
      return res.status(403).send("User does not exist");
    }
  })

  // Open server to listen for requests
  server.listen(EXPRESS_PORT, () => console.log(`server live on http://localhost:${EXPRESS_PORT}`));

  return io;
}

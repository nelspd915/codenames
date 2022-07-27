import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { users } from ".";
import { User } from "codenames-frontend";

import jwt from "jsonwebtoken";
require("dotenv").config();

/**
 * Sets up server environment and returns the socket IO.
 */

const refreshTokens: string[] = [];

export function setupServer(): Server {
  
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

  const authenticateUser = (token: string): boolean | undefined=> {
    let authenticated: boolean = false;
    if (token !== undefined) {

    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
      if (err) {
        authenticated = false;
      } else {
        console.log("here");
        authenticated = true;
      }
    });
    return authenticated
  }

  // Initialize middleware for server
  app.use(express.json());
  app.use(cors());

  // Api routes
  app.get("/users", (req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      console.log(authenticateUser(token));
    }
    res.json(users);
  });

  app.post("/register", (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password
    };
    users.push(user);
    res.status(201).send("success");
  });

  app.post("/login", (req, res) => {
    const user: User = users.find((user) => user.username === req.body.username) as User;

    if (user !== undefined) {
      if (req.body.password === user.password) {
        const accessToken = jwt.sign({ username: user.username}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15s" });
        const refreshToken = jwt.sign({ username: user.username}, process.env.REFRESH_TOKEN_SECRET as string);
        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken});
      } else {
        res.status(401).send("passwords do not match");
      }
    } else {
      res.status(401).send("user doesnt exists");
    }
  });

  app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === undefined) {
      return res.sendStatus(401);
    }
    if (refreshTokens.includes(refreshToken)) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ username: user.username}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15s" }); 
        res.json({ accessToken: accessToken });
      });
    }
  });

  // Open server to listen for requests
  server.listen(EXPRESS_PORT, () =>
    console.log(`server live on http://localhost:${EXPRESS_PORT}`)
  );

  return io;
}

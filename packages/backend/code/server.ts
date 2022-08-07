import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { users } from "./index";
import { hashSync, compareSync } from "bcryptjs";
import { User } from "./types";

let jwt = require("jsonwebtoken");

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

  app.post("/register", async (req, res): Promise<void> => {
    const username = req.body.username;
    const hashedPassword = hashSync(req.body.passwordOne, 10);
    const user = (await users?.findOne({ username: username })) as User | null | undefined;
    const samePass = req.body.passwordOne === req.body.passwordTwo;

    if (user === null) {
      if (samePass) {
        const newUser: User = {
          username: username,
          password: hashedPassword,
          verified: true
        };
        await users?.insertOne(newUser);
        res.status(201).send("success");
      } else {
        res.status(401).send("Passwords do not match");
      }
    } else if (user?.verified) {
      res.status(401).send("User with this name already exists");
    } else {
      if (samePass) {
        users?.updateOne({ username: username }, { $set: { verified: true, password: hashedPassword } });
        res.status(201).send("success");
      } else {
        res.status(401).send("Passwords do not match");
      }
    }
  });

  app.post("/login", async (req, res): Promise<void> => {
    const user = (await users?.findOne({ username: req.body.username })) as User | null | undefined;

    if (user !== null) {
      if (compareSync(req.body.password, user?.password as string)) {
        const accessToken = jwt.sign({ username: user?.username }, process.env.ACCESS_TOKEN_SECRET as string, {
          expiresIn: "15m"
        });
        const refreshToken = jwt.sign({ username: user?.username }, process.env.REFRESH_TOKEN_SECRET as string, {
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
      res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        res.sendStatus(403);
      }
      const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "15m"
      });
      res.json({ accessToken: accessToken });
    });
  });

  // Open server to listen for requests
  server.listen(EXPRESS_PORT, () => console.log(`server live on http://localhost:${EXPRESS_PORT}`));

  return io;
}

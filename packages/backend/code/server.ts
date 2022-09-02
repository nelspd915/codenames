import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

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
      origin: ["http://localhost:3333", "https://nelspd915.github.io", "https://codenames.dev"]
    }
  });

  // Initialize middleware for server
  app.use(express.json());
  app.use(cors());

  // Open server to listen for requests
  server.listen(EXPRESS_PORT, () => console.log(`server live on http://localhost:${EXPRESS_PORT}`));

  return io;
}

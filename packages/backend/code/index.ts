import { Color, Mode, GameData, Room, Rooms, UnfinishedRoom, Team, User } from "codenames-frontend";
import { generateMasterBoard, generatePublicBoard } from "./utils";
import { GUESSER_SUFFIX, SPYMASTER_SUFFIX, STARTING_SCORES } from "./constants";
import { setupServer } from "./server";
import { cloneDeep, shuffle } from "lodash";

// Setup server
const io = setupServer();

// Initialize storage
const rooms: Rooms = {};
export const users: User[] = [];

/**
 * Broadcasts a game update for entire room.
 * @param room
 */
const updateGameForRoom = (room: Room): void => {
  const gameData: GameData = {
    board: room.publicBoard,
    players: room.players,
    scores: room.scores,
    turn: room.turn
  };

  // Update game for guessers and spymasters
  io.to(room.code + GUESSER_SUFFIX).emit("updateGame", gameData);
  io.to(room.code + SPYMASTER_SUFFIX).emit("updateGame", {
    ...gameData,
    board: room.masterBoard
  });
};

/**
 * Updates scores for the room.
 * @param room
 */
const updateScores = (room: Room): void => {
  room.scores = { blue: 0, red: 0, gray: 0, black: 0 };
  room.masterBoard.forEach(cell => {
    if (cell.revealed === false) {
      room.scores[cell.color as Color] += 1;
    }
  });
};

/**
 * Ends a team's turn.
 * @param roomCode
 */
const endTurn = (roomCode: string): void => {
  const room = rooms[roomCode];
  room.turn = room.turn === Color.Blue ? (room.turn = Color.Red) : (room.turn = Color.Blue);
  updateGameForRoom(rooms[roomCode]);
};

/**
 * Randomize teams in a room.
 * @param roomCode
 */

const randomizeTeams = (roomCode: string): void => {
  const room = rooms[roomCode];
  room.players = shuffle(room.players);

  // Determine initial team color
  let evenTeam: Team = Color.Red;
  let oddTeam: Team = Color.Blue;

  if (Math.random() < 0.5) {
    oddTeam = Color.Red;
    evenTeam = Color.Blue;
  }

  // Assign new teams to players
  for (let i = 0; i < room.players.length; i++) {
    room.players[i].team = i % 2 === 0 ? evenTeam : oddTeam;
  }

  updateGameForRoom(room);
}
/**
 * Reveals a cell on the public board.
 * @param roomCode
 * @param cellIndex
 */
const revealCell = (roomCode: string, cellIndex: number): void => {
  const room = rooms[roomCode];
  const cellColor = room.masterBoard[cellIndex].color as Color;
  room.publicBoard[cellIndex].color = cellColor;
  room.publicBoard[cellIndex].revealed = true;
  room.masterBoard[cellIndex].revealed = true;
  updateScores(room);

  // Whether the game is now over
  const gameOver = room.scores[Color.Blue] === 0 || room.scores[Color.Red] === 0 || cellColor === Color.Black;

  if (gameOver) {
    room.masterBoard.forEach(cell => {
      cell.mode = Mode.Endgame;
    });
    room.publicBoard = room.masterBoard;
  } else {
    // Whether current turn is now over
    const turnOver = cellColor != room.turn;

    if (turnOver) {
      endTurn(roomCode);
    }
  }

  updateGameForRoom(room);
};

/**
 * Reset a room by populating new game data.
 */
const resetRoom = (partialRoom: UnfinishedRoom): Room => {
  const newRoom = cloneDeep(partialRoom);
  newRoom.scores = { ...STARTING_SCORES };
  newRoom.turn = Color.Blue;
  newRoom.masterBoard = generateMasterBoard(STARTING_SCORES);
  newRoom.publicBoard = generatePublicBoard(newRoom.masterBoard);
  newRoom.players.forEach(player => {
    player.mode = Mode.Normal;
    player.spoiled = false;
  });
  return newRoom as Room;
};

// Setting up a connection to a client
io.on("connection", socket => {
  // Callback function to join a room
  const joinRoom = (roomCode: string, username: string) => {
    const room = rooms[roomCode];
    const player = room.players.find(player => player.username === username);
    if (player === undefined) {
      room.players.push({
        username: username,
        mode: Mode.Normal,
        spoiled: false,
        team: Color.Blue
      });
    }

    if (player?.mode === Mode.Spymaster) {
      socket.join(roomCode + SPYMASTER_SUFFIX);
    } else {
      socket.join(roomCode + GUESSER_SUFFIX);
    }

    updateGameForRoom(room);
  };

  // Callback function to create a new room
  const createRoom = (roomCode: string, host: string): void => {
    const unfinishedRoom: UnfinishedRoom = {
      code: roomCode,
      host: host,
      players: [],
      turn: Color.Blue
    };
    rooms[roomCode] = resetRoom(unfinishedRoom);
    joinRoom(roomCode, host);
  };

  // Callback function to become a spymaster
  const becomeSpymaster = (roomCode: string, username: string, suppressUpdate = false): void => {
    socket.leave(roomCode + GUESSER_SUFFIX);
    socket.join(roomCode + SPYMASTER_SUFFIX);
    const room = rooms[roomCode];
    const player = room.players.find(player => player.username === username);
    if (player !== undefined) {
      player.mode = Mode.Spymaster;
      player.spoiled = true;
    }

    if (suppressUpdate === false) {
      updateGameForRoom(room);
    }
  };

  /**
   * Become a guesser.
   * @param roomCode
   * @param username
   */
  const becomeGuesser = (roomCode: string, username: string, suppressUpdate = false): void => {
    socket.leave(roomCode + SPYMASTER_SUFFIX);
    socket.join(roomCode + GUESSER_SUFFIX);
    const room = rooms[roomCode];
    const player = room.players.find(player => player.username === username);
    if (player !== undefined) {
      player.mode = Mode.Normal;
    }

    if (suppressUpdate === false) {
      updateGameForRoom(room);
    }
  };

  /**
   * Creates new game for room.
   * @param roomCode
   */
  const newGame = async (roomCode: string): Promise<void> => {
    rooms[roomCode] = resetRoom(rooms[roomCode]);
    const spymasterSockets = await io.in(roomCode + SPYMASTER_SUFFIX).fetchSockets();
    spymasterSockets.forEach(spymaster => {
      spymaster.leave(roomCode + SPYMASTER_SUFFIX);
      spymaster.join(roomCode + GUESSER_SUFFIX);
    });

    updateGameForRoom(rooms[roomCode]);
  };

  /**
   * Creates or joins a room to enter.
   * @param roomCode
   * @param username
   */
  const enterRoom = (roomCode: string, username: string): void => {
    if (rooms[roomCode] === undefined) {
      createRoom(roomCode, username);
    }

    joinRoom(roomCode, username);

    updateGameForRoom(rooms[roomCode]);
  };

  /**
   * Joins a team.
   * @param roomCode
   * @param username
   * @param team
   */
  const joinTeam = (roomCode: string, username: string, team: Team): void => {
    const room = rooms[roomCode];
    const player = room.players.find(player => player.username === username);
    if (player !== undefined) {
      player.team = team;
    }
    updateGameForRoom(rooms[roomCode]);
  };

  // Add server listeners with callback functions
  socket.on("becomeSpymaster", becomeSpymaster);
  socket.on("becomeGuesser", becomeGuesser);
  socket.on("newGame", newGame);
  socket.on("enterRoom", enterRoom);
  socket.on("revealCell", revealCell);
  socket.on("joinTeam", joinTeam);
  socket.on("endTurn", endTurn);
  socket.on("randomizeTeams", randomizeTeams);
});

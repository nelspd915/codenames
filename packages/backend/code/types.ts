import { BoardData, CellData, Color, PlayerData, Scores, Team } from "codenames-frontend";
import Queue from "queue-promise";

/**
 * Dictionary of queues for each room.
 */
export type Queues = {
  [key in string]: Queue;
};

export type TurnHistory = {
  cell: CellData;
  username: string;
  turn: Color;
};

export type GameHistory = {
  gameId: string;
  roomCode: string;
  roomHost: string;
  board: BoardData;
  startingPlayers: PlayerData[];
  startingScores: Scores;
  endingPlayers?: PlayerData[];
  endingScores?: Scores;
  winner?: Team;
  turns: TurnHistory[];
};

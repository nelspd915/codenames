// @ts-ignore
import { CodenamesApp } from "../components/codenames-app/codenames-app";

/**
 * Enumerator for possible cell colors.
 */
export enum Color {
  Blue = "blue",
  Red = "red",
  Gray = "gray",
  Black = "black"
}

export type Team = Extract<Color, Color.Blue | Color.Red | Color.Gray>;

/**
 * Possible display modes for a cell.
 */
export enum Mode {
  Normal = "normal",
  Spymaster = "spymaster",
  Endgame = "endgame"
}

/**
 * Array of cell data.
 */
export type BoardData = CellData[];

/**
 * Data to apply to a cell.
 */
export interface CellData {
  word: string;
  color?: Color;
  mode?: Mode;
  revealed?: boolean;
}

/**
 * Data to apply to a player.
 */
export interface PlayerData {
  username?: string;
  mode?: Mode;
  spoiled?: boolean;
  team?: Team;
  connected?: boolean;
}

/**
 * Team scores.
 */
export type Scores = {
  [key in Color]: number;
};

/**
 * Game data.
 */
export interface GameData {
  board: BoardData;
  players: PlayerData[];
  scores: Scores;
  turn: Color;
}

/**
 * Library of requests that can be made to the server.
 */
export interface Requests {
  /**
   * @see {@link CodenamesApp.revealCell}
   */
  revealCell?: (index: number) => void;
  /**
   * @see {@link CodenamesApp.enterRoom}
   */
  enterRoom?: (username: string, roomCode: string) => void;
  /**
   * @see {@link CodenamesApp.becomeSpymaster}
   */
  becomeSpymaster?: () => void;
  /**
   * @see {@link CodenamesApp.becomeGuesser}
   */
  becomeGuesser?: () => void;
  /**
   * @see {@link CodenamesApp.newGame}
   */
  newGame?: () => void;
  /**
   * @see {@link CodenamesApp.createRoom}
   */
  createRoom?: () => void;
  /**
   * @see {@link CodenamesApp.joinTeam}
   */
  joinTeam?: (color: Color) => void;
  /**
   * @see {@link CodenamesApp.endTurn}
   */
  endTurn?: () => void;
  /**
   * @see {@link CodenamesApp.randomizeTeams}
   */
  randomizeTeams?: () => void;
}

export type Rooms = {
  [key in string]: Room;
};

export interface Room {
  code: string;
  host: string;
  masterBoard: BoardData;
  publicBoard: BoardData;
  players: PlayerData[];
  scores: Scores;
  turn: Color;
  currentGameId: string;
}

export interface UnfinishedRoom {
  code: string;
  host: string;
  players: PlayerData[];
  masterBoard?: BoardData;
  publicBoard?: BoardData;
  scores?: Scores;
  turn: Color;
  currentGameId?: string;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// @ts-ignore
import { CodenamesApp } from "../components/codenames-app/codenames-app";

import { Socket } from "socket.io";

/**
 * Enumerator for possible cell colors.
 */
export enum Color {
  Blue = "blue",
  Red = "red",
  Gray = "gray",
  Black = "black"
}

export type Team = Extract<Color, Color.Blue | Color.Red>;

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
  socket?: Socket;
  username?: string;
  mode?: Mode;
  spoiled?: boolean;
  team?: Team;
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
   * @see {@link CodenamesApp.updateUsername}
   */
  updateUsername?: (username: string) => void;
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
}

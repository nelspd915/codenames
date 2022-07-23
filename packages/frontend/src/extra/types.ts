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
  word: string,
  color?: Color,
  mode?: Mode,
  revealed?: boolean
}

/**
 * Data to apply to a player.
 */
export interface PlayerData {
  socket: Socket,
  username?: string,
  mode?: Mode,
  team?: Team
}

/**
 * Team scores.
 */
export interface Scores {
  blue: number,
  red: number
}
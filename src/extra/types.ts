/**
 * Array of cell data.
 */
export type CellData = SingleCellData[];

/**
 * Enumerator for possible cell colors.
 */
export enum CellColor {
  Blue = "blue",
  Red = "red",
  Gray = "gray",
  Black = "black"
}

/**
 * Possible display modes for a cell.
 */
export enum CellMode {
  Normal = "normal",
  Spymaster = "spymaster",
  Endgame = "endgame"
}

/**
 * Data to apply to a cell.
 */
export interface SingleCellData {
  word: string,
  color: CellColor,
  mode: CellMode,
  revealed: boolean
}
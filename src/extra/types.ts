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
 * Data to apply to a cell.
 */
export interface CellData {
  word: string,
  color: CellColor
}
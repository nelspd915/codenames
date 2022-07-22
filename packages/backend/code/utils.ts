import { BoardData, CellColor, CellMode } from "codenames-frontend";
import words from "./data/words.json";
import { shuffle, sampleSize } from "lodash";

const addColoredCells = (
  board: BoardData,
  count: number,
  color: CellColor,
  words: string[]
) => {
  for (let i = 0; i < count; i += 1) {
    board.push({
      word: words.pop() ?? "",
      color: color,
      mode: CellMode.Spymaster,
      revealed: false,
    });
  }
};

export const generateBoard = (
  blue: number,
  red: number,
  gray: number,
  black: number
): BoardData => {
  const wordCount = red + blue + gray + black;
  const chosenWords = sampleSize(words, wordCount);
  const board: BoardData = [];

  addColoredCells(board, red, CellColor.Red, chosenWords);
  addColoredCells(board, blue, CellColor.Blue, chosenWords);
  addColoredCells(board, black, CellColor.Black, chosenWords);
  addColoredCells(board, gray, CellColor.Gray, chosenWords);

  return shuffle(board);
};

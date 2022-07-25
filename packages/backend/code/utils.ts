import {
  BoardData,
  CellData,
  Color,
  Mode,
  PlayerData,
  Scores,
} from "codenames-frontend";
import words from "./data/words.json";
import { shuffle, sampleSize } from "lodash";

const addColoredCells = (
  board: BoardData,
  count: number,
  color: Color,
  words: string[]
) => {
  for (let i = 0; i < count; i += 1) {
    board.push({
      word: words.pop() ?? "",
      color: color,
      mode: Mode.Spymaster,
      revealed: false,
    });
  }
};

export const generateMasterBoard = (startingScores: Scores): BoardData => {
  const { blue, red, gray, black } = startingScores;
  const wordCount = blue + red + gray + black;
  const chosenWords = sampleSize(words, wordCount);
  const board: BoardData = [];

  addColoredCells(board, blue, Color.Blue, chosenWords);
  addColoredCells(board, red, Color.Red, chosenWords);
  addColoredCells(board, black, Color.Black, chosenWords);
  addColoredCells(board, gray, Color.Gray, chosenWords);

  return shuffle(board);
};

export const generatePublicBoard = (board: BoardData): BoardData => {
  return board.map((masterCell) => {
    const publicCell: CellData = {
      word: masterCell.word,
      mode: Mode.Normal,
      revealed: false,
    };
    return publicCell;
  });
};

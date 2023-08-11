import { BoardData, CellData, Color, Mode, Scores } from "codenames-frontend";
import { shuffle, sampleSize } from "lodash";

import words from "./data/words.json";
// import goodWords from "./data/good_words.json";
// import politicsWords from "./data/politics_words.json";
// import nickWords from "./data/nick_words.json";

// const allWords = words.concat(goodWords).concat(politicsWords).concat(nickWords);
const allWords = words;

const addColoredCells = (board: BoardData, count: number, color: Color, words: string[]) => {
  for (let i = 0; i < count; i += 1) {
    board.push({
      word: words.pop() ?? "",
      color: color,
      mode: Mode.Spymaster,
      revealed: false
    });
  }
};

export const generateMasterBoard = (startingScores: Scores): BoardData => {
  const { blue, red, gray, black } = startingScores;
  const wordCount = blue + red + gray + black;
  const chosenWords = sampleSize(allWords, wordCount);
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
      revealed: false
    };
    return publicCell;
  });
};

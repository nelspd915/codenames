import {
  BoardData,
  CellData,
  Color,
  GameData,
  Mode,
  PlayerData,
} from "codenames-frontend";
import words from "./data/words.json";
import { shuffle, sampleSize, cloneDeep } from "lodash";

export function printPlayers(allPlayers: PlayerData[]) {
  console.log(
    "players:",
    allPlayers.map((player) => {
      return {
        socketId: player.socket?.id,
        username: player.username,
        mode: player.mode,
        team: player.team,
      };
    })
  );
}

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

export const generateMasterBoard = (
  blue: number,
  red: number,
  gray: number,
  black: number
): BoardData => {
  const wordCount = red + blue + gray + black;
  const chosenWords = sampleSize(words, wordCount);
  const board: BoardData = [];

  addColoredCells(board, red, Color.Red, chosenWords);
  addColoredCells(board, blue, Color.Blue, chosenWords);
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

export const updateGameForPlayer = (
  player: PlayerData,
  masterBoard: BoardData,
  gameData: GameData
): void => {
  const gameDataClone = cloneDeep(gameData);
  if (player.mode === Mode.Spymaster) {
    gameDataClone.board = masterBoard;
  }

  // Remove sockets from players
  for (const player of gameDataClone.players) {
    delete player.socket;
  }
  printPlayers(gameData.players);

  player.socket?.emit("updateGame", gameDataClone);
};

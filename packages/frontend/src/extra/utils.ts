import { BLACK_WORDS, Color, Scores, Team } from "./types";

/**
 * Finds winner for a room.
 * @param scores
 * @param turn
 */
export const findWinner = (scores: Scores | undefined, turn: Color | undefined): Team => {
  let winner: Team = Color.Gray;
  if (scores?.[Color.Black] !== BLACK_WORDS) {
    if (turn === Color.Blue) {
      winner = Color.Red;
    } else if (turn === Color.Red) {
      winner = Color.Blue;
    }
  } else if (scores?.[Color.Blue] === 0) {
    winner = Color.Blue;
  } else if (scores?.[Color.Red] === 0) {
    winner = Color.Red;
  }

  return winner;
};

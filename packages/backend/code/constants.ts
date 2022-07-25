import { Color, Scores } from "codenames-frontend";

// Constants for how many words of each color should be used
export const BLUE_WORDS = 9;
export const RED_WORDS = 8;
export const GRAY_WORDS = 7;
export const BLACK_WORDS = 1;

// Starting scores
export const STARTING_SCORES: Scores = {
  [Color.Blue]: BLUE_WORDS,
  [Color.Red]: RED_WORDS,
  [Color.Gray]: GRAY_WORDS,
  [Color.Black]: BLACK_WORDS,
};

// Room code suffixes
export const SPYMASTER_SUFFIX = "_spymaster";
export const GUESSER_SUFFIX = "guesser";

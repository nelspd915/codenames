import { GameHistory } from "./types";
import { history } from "./index";

export async function getGames(username: string): Promise<GameHistory[]> {
  const games = (await history?.find({ "endingPlayers.username": `${username}` }).toArray()) as
    | GameHistory[]
    | undefined;
  return games ?? [];
}

export function getWinRate(games: GameHistory[], username: string): number {
  if (games.length == 0) {
    return -1;
  }
  const totalWins = games
    .map((game) => {
      const player = game.endingPlayers?.find((player) => player.username == username);
      return (player?.team !== game.winner ? 0 : 1) as number;
    })
    .reduce((wins, x) => wins + x);

  return totalWins / games.length;
}

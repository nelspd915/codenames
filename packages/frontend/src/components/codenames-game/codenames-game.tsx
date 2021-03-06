import { Component, Host, h, Prop, State, Watch } from "@stencil/core";
import { isEqual } from "lodash";
import { Color, GameData, Mode, PlayerData, Requests } from "../../extra/types";

@Component({
  tag: "codenames-game",
  styleUrl: "codenames-game.scss",
  shadow: true
})
export class CodenamesGame {
  /**
   * Library of requests that can be made to the server.
   */
  @Prop() requests: Requests;

  /**
   * Game data used to populate values on the board and UI.
   */
  @Prop() gameData?: GameData;

  /**
   * Watcher for game data. Ensures "End turn" button doesn't spoil result before loader finishes.
   */
  @Watch("gameData")
  gameDataChanged(newData: GameData, oldData: GameData): void {
    if (isEqual(newData?.board, oldData?.board) === false) {
      setTimeout(() => {
        this.canGuess = this.isUsersTurn();
      }, 300);
    } else if (newData?.turn !== oldData?.turn) {
      this.canGuess = this.isUsersTurn();
    }
  }

  /**
   * Player data for the user.
   */
  @Prop() userPlayer?: PlayerData;

  /**
   * Watcher for user player.
   */
  @Watch("userPlayer")
  userPlayerChanged(newPlayer: GameData, oldPlayer: GameData): void {
    if (isEqual(newPlayer, oldPlayer) === false) {
      this.canGuess = this.isUsersTurn();
    }
  }

  /**
   * Whether it is currently the user's turn to guess.
   */
  @State() private canGuess: boolean = false;

  /**
   * Stencil lifecycle method `render` for `codenames-game` component.
   */
  render(): void {
    return (
      <Host>
        <codenames-panel requests={this.requests} panelTeam={Color.Blue} players={this.gameData?.players}>
          <codenames-button
            class={this.userPlayer?.team !== Color.Blue ? "" : "hidden"}
            slot="list-button"
            color={Color.Blue}
            onClick={() => this.requests.joinTeam(Color.Blue)}
          >
            <span>Join {Color.Blue}</span>
          </codenames-button>
          <codenames-button
            slot="footer-button"
            on={this.userPlayer?.mode === Mode.Spymaster}
            onClick={this.spymasterToggle}
          >
            <span>Spymaster ????</span>
          </codenames-button>
          <codenames-button slot="footer-button" onClick={this.requests.randomizeTeams}>
            <span>Randomize teams ???</span>
          </codenames-button>
          <codenames-button slot="footer-button" onClick={this.requests.newGame}>
            <span>New game ???</span>
          </codenames-button>
        </codenames-panel>

        <div>
          <codenames-scores scores={this.gameData?.scores} turn={this.gameData?.turn}></codenames-scores>
          <codenames-board
            requests={this.requests}
            boardData={this.gameData?.board}
            canGuess={this.canGuess}
          ></codenames-board>
        </div>

        <codenames-panel requests={this.requests} panelTeam={Color.Red} players={this.gameData?.players}>
          <codenames-button
            class={this.userPlayer?.team !== Color.Red ? "" : "hidden"}
            slot="list-button"
            color={Color.Red}
            onClick={() => this.requests.joinTeam(Color.Red)}
          >
            <span>Join {Color.Red}</span>
          </codenames-button>
          <codenames-button
            class={this.canGuess ? "" : "hidden"}
            slot="footer-button"
            onClick={() => this.requests.endTurn()}
          >
            <span>End turn ???</span>
          </codenames-button>
        </codenames-panel>
      </Host>
    );
  }

  /**
   * Toggles between spymaster and guesser.
   */
  private spymasterToggle = (): void => {
    if (this.userPlayer?.mode === Mode.Spymaster) {
      this.requests.becomeGuesser();
    } else {
      this.requests.becomeSpymaster();
    }
  };

  /**
   * Finds whether it is currently the user's turn to guess.
   */
  private isUsersTurn(): boolean {
    return (
      this.gameData?.turn === this.userPlayer?.team &&
      this.userPlayer?.mode === Mode.Normal &&
      this.gameData?.board?.[0]?.mode !== Mode.Endgame
    );
  }
}

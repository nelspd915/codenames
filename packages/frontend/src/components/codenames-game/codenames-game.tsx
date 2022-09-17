import { Component, Host, h, Prop, State } from "@stencil/core";
import { Color, GameData, Mode, PlayerData, Server } from "../../extra/types";

@Component({
  tag: "codenames-game",
  styleUrl: "codenames-game.scss",
  shadow: true
})
export class CodenamesGame {
  /**
   * Library of server utilities.
   */
  @Prop() server: Server;

  /**
   * Game data used to populate values on the board and UI.
   */
  @Prop() gameData?: GameData;

  /**
   * Player data for the user.
   */
  @Prop() userPlayer?: PlayerData;

  /**
   * Whether the socket is connected.
   */
  @Prop() socketIsConnected?: boolean = false;

  /**
   * Index of cell currently loading.
   */
  @State() private loadingCellIndex: number = -1;

  /**
   * Index of cell currently loading.
   */
  @State() private revealUpdate: boolean = true;

  /**
   * Stencil lifecycle method `componentWillLoad` for `codenames-game` component.
   */
  componentWillLoad(): void {
    this.server.socket.on("loadingCell", (cellIndex: number) => {
      if (cellIndex >= 0) {
        this.loadingCellIndex = cellIndex;
      } else {
        setTimeout(() => {
          this.loadingCellIndex = cellIndex;
          this.revealUpdate = true;
        }, 300);
      }
    });
  }

  /**
   * Stencil lifecycle method `componentShouldUpdate` for `codenames-game` component.
   */
  componentShouldUpdate(): boolean {
    return this.revealUpdate === true;
  }

  /**
   * Stencil lifecycle method `render` for `codenames-game` component.
   */
  render(): HTMLCodenamesGameElement {
    // if a cell is loading, prevent any further updates from being revealed
    if (this.loadingCellIndex >= 0) {
      this.revealUpdate = false;
    }
    const isUsersTurn =
      this.gameData?.turn === this.userPlayer?.team &&
      this.userPlayer?.mode === Mode.Normal &&
      this.gameData?.board?.[0]?.mode !== Mode.Endgame;
    return (
      <Host>
        <codenames-panel server={this.server} panelTeam={Color.Blue} players={this.gameData?.players}>
          <codenames-button
            class={this.userPlayer?.team !== Color.Blue ? "" : "hidden"}
            slot="list-button"
            color={Color.Blue}
            onClick={() => this.server.joinTeam(Color.Blue)}
          >
            <span>Join {Color.Blue}</span>
          </codenames-button>
          <codenames-button
            slot="footer-button"
            on={this.userPlayer?.mode === Mode.Spymaster}
            onClick={this.spymasterToggle}
          >
            <span>Spymaster 👁</span>
          </codenames-button>
          <codenames-button slot="footer-button" onClick={this.server.randomizeTeams}>
            <span>Randomize teams ⚄</span>
          </codenames-button>
          <codenames-button slot="footer-button" onClick={this.server.newGame}>
            <span>New game →</span>
          </codenames-button>
        </codenames-panel>

        <div>
          <codenames-scores scores={this.gameData?.scores} turn={this.gameData?.turn}></codenames-scores>
          <codenames-board
            server={this.server}
            socketIsConnected={this.socketIsConnected}
            boardData={this.gameData?.board}
            canGuess={isUsersTurn && this.loadingCellIndex < 0}
            loadingCellIndex={this.loadingCellIndex}
          ></codenames-board>
        </div>

        <codenames-panel server={this.server} panelTeam={Color.Red} players={this.gameData?.players}>
          <codenames-button
            class={this.userPlayer?.team !== Color.Red ? "" : "hidden"}
            slot="list-button"
            color={Color.Red}
            onClick={() => this.server.joinTeam(Color.Red)}
          >
            <span>Join {Color.Red}</span>
          </codenames-button>
          <codenames-button
            class={isUsersTurn ? "" : "hidden"}
            slot="footer-button"
            onClick={() => this.server.endTurn()}
          >
            <span>End turn ✓</span>
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
      this.server.becomeGuesser();
    } else {
      this.server.becomeSpymaster();
    }
  };
}

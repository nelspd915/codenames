import { Component, Host, h, Prop } from "@stencil/core";
import { Color, GameData, Mode, PlayerData, Requests } from "../../extra/types";

@Component({
  tag: "codenames-game",
  styleUrl: "codenames-game.scss",
  shadow: true,
})
export class CodenamesGame {
  /**
   * Library of requests that can be made to the server.
   */
  @Prop() requests: Requests;

  /**
   * Game data used to populate values on the board and UI.
   */
  @Prop() gameData: GameData | undefined;

  /**
   * Player data for the user.
   */
  @Prop() userPlayer?: PlayerData;

  /**
   * Stencil lifecycle method `render` for `codenames-game` component.
   */
  render(): void {
    return (
      <Host>
        <codenames-panel requests={this.requests} panelTeam={Color.Blue} players={this.gameData?.players}>
          <codenames-button slot="button" on={this.userPlayer?.mode === Mode.Spymaster} onClick={this.spymasterToggle}>
            Spymaster 👁
          </codenames-button>
          <codenames-button slot="button" onClick={this.requests.newGame}>
            New game →
          </codenames-button>
        </codenames-panel>

        <div>
          <codenames-scores scores={this.gameData?.scores}></codenames-scores>
          <codenames-board requests={this.requests} boardData={this.gameData?.board}></codenames-board>
        </div>

        <codenames-panel requests={this.requests} panelTeam={Color.Red} players={this.gameData?.players}></codenames-panel>
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
}

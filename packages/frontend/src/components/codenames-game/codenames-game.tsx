import { Component, Host, h, Prop } from '@stencil/core';
import { GameData, PlayerData, Requests } from "../../extra/types";

@Component({
  tag: 'codenames-game',
  styleUrl: 'codenames-game.scss',
  shadow: true,
})
export class CodenamesGame {

  /**
   * Library of requests that can be made to the server
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
        <codenames-left-panel
          requests={this.requests}
          players={this.gameData?.players}
          userPlayer={this.userPlayer}
        ></codenames-left-panel>
        <div>
          <codenames-scores scores={this.gameData?.scores}></codenames-scores>
          <codenames-board requests={this.requests} boardData={this.gameData?.board}></codenames-board>
        </div>
      </Host>
    );
  }

}

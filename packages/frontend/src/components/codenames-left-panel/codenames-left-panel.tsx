import { Component, Host, h, Prop } from '@stencil/core';
import { Color, Mode, PlayerData, Requests } from "../../extra/types";

@Component({
  tag: 'codenames-left-panel',
  styleUrl: 'codenames-left-panel.scss',
  shadow: true,
})
export class CodenamesLeftPanel {

  /**
   * Library of requests that can be made to the server
   */
  @Prop() requests: Requests;

  /**
   * All players in the game.
   */
  @Prop() players?: PlayerData[];

  /**
   * Player data for the user.
   */
  @Prop() userPlayer?: PlayerData;

  /**
   * Stencil lifecycle method `render` for `codenames-left-panel` component.
   */
  render() {
    return (
      <Host>
        <div class="player-list">
          {this.players?.map((player) => {
            return this.isOnTeam(player) ?
              this.getNameElement(player)
              : null
          })}
        </div>
        <div class="buttons-container">
          <codenames-button
            on={this.userPlayer.mode === Mode.Spymaster}
            onClick={this.spymasterToggle}
          >Spymaster 👁</codenames-button>
          <codenames-button onClick={this.requests.newGame}>New game →</codenames-button>
        </div>
      </Host>
    );
  }

  private spymasterToggle = (): void => {
    if (this.userPlayer?.mode === Mode.Spymaster) {
      this.requests.becomeGuesser();
    } else {
      this.requests.becomeSpymaster();
    }
  }

  private isOnTeam(player: PlayerData): boolean {
    return player.username !== undefined && player.team === Color.Blue;
  }

  private getNameElement(player: PlayerData): HTMLElement {
    let icon = `👁`;
    let iconClass = "normal-icon";
    if (player.mode === Mode.Spymaster) {
      iconClass = "spymaster-icon";
    } else if (player.spoiled === true) {
      icon = `⚠`;
      iconClass = "spoiled-icon";
    } else {

    }

    return <div class="player-name">
      {`${player.username} `}
      <span class={iconClass}>{icon}</span>
    </div>
  }

}

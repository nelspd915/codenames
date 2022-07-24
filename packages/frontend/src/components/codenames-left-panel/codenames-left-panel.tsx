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
            return this.isOnTeam(player) ? this.getNameElement(player) : null
          })}
        </div>
        <div class="buttons-container">
          <codenames-button
            on={this.userPlayer?.mode === Mode.Spymaster}
            onClick={this.spymasterToggle}
          >Spymaster 👁</codenames-button>
          <codenames-button onClick={this.requests.newGame}>New game →</codenames-button>
        </div>
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
  }

  /**
   * Whether the player is on the team for this panel.
   * @param player
   */
  private isOnTeam(player: PlayerData): boolean {
    const value = (player.username ?? "") !== "" && player.team === Color.Blue;
    return value;
  }

  /**
   * Gets the element to display a player's name and icon.
   * @param player
   */
  private getNameElement(player: PlayerData): HTMLElement {
    let icon = ` `;
    let iconClass = "";
    if (player.mode === Mode.Spymaster) {
      icon = `👁`;
    } else if (player.spoiled === true) {
      icon = `⚠`;
      iconClass = "spoiled-icon";
    }

    return <div class="player-name">
      <div class={`player-icon ${iconClass}`}>{icon}</div>
      <div class="player-name-text">{`${player.username}`}</div>
    </div>
  }

}

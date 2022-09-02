import { Component, Host, h, Prop } from "@stencil/core";
import { Color, Mode, PlayerData, Server } from "../../extra/types";

@Component({
  tag: "codenames-panel",
  styleUrl: "codenames-panel.scss",
  shadow: true
})
export class CodenamesPanel {
  /**
   * Library of server utilities.
   */
  @Prop() server: Server;

  /**
   * Library of server utilities.
   */
  @Prop() panelTeam: Color;

  /**
   * All players in the game.
   */
  @Prop() players?: PlayerData[];

  /**
   * Stencil lifecycle method `render` for `codenames-panel` component.
   */
  render() {
    return (
      <Host class={this.panelTeam}>
        <div class="player-list">
          {this.players?.map((player) => {
            return this.isOnTeam(player) ? this.getNameElement(player) : null;
          })}
          <div class="list-button-container">
            <slot name="list-button"></slot>
          </div>
        </div>
        <div class="footer-buttons-container">
          <slot name="footer-button"></slot>
        </div>
      </Host>
    );
  }

  /**
   * Whether the player is on the team for this panel. //
   * @param player
   */
  private isOnTeam(player: PlayerData): boolean {
    const value = (player.username ?? "") !== "" && player.team === this.panelTeam;
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

    return (
      <div class={`player-name ${this.panelTeam}`}>
        <div class="player-name-text">
          {`${player.username}`}
          <div class={`player-icon ${iconClass}`}>{icon}</div>
        </div>
      </div>
    );
  }
}

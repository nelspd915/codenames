import { Component, Host, h, Prop } from "@stencil/core";
import { Color, Scores } from "../../extra/types";
import { findWinner } from "../../extra/utils";

@Component({
  tag: "codenames-scores",
  styleUrl: "codenames-scores.scss",
  shadow: true
})
export class CodenamesScores {
  /**
   * Scores to display.
   */
  @Prop() scores: Scores;

  /**
   * Team whose turn it is.
   */
  @Prop() turn: Color;

  /**
   * Stencil lifecycle method `render` for `codenames-scores` component.
   */
  render(): HTMLCodenamesScoresElement {
    const winner = findWinner(this.scores, this.turn);
    let blueBanner = "";
    let redBanner = "";

    if (winner === Color.Blue) {
      blueBanner = "Blue wins!";
    } else if (winner === Color.Red) {
      redBanner = "Red wins!";
    } else if (this.turn === Color.Blue) {
      blueBanner = "← Blue's turn";
    } else if (this.turn === Color.Red) {
      redBanner = "Red's turn →";
    }

    return (
      <Host>
        <div class="scores-container">
          <div class={Color.Blue + " turn-text"}>{blueBanner}</div>
          <div>
            <span class={Color.Blue}>{this.scores?.[Color.Blue] ?? "?"}</span>
            {" - "}
            <span class={Color.Red}>{this.scores?.[Color.Red] ?? "?"}</span>
          </div>
          <div class={Color.Red + " turn-text"}>{redBanner}</div>
        </div>
      </Host>
    );
  }
}

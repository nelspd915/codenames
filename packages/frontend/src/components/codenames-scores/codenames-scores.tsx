import { Component, Host, h, Prop } from "@stencil/core";
import { Color, Scores } from "../../extra/types";

@Component({
  tag: "codenames-scores",
  styleUrl: "codenames-scores.scss",
  shadow: true
})
export class CodenamesScores {
  /**
   * Scores to display.
   */
  @Prop() scores?: Scores;

  /**
   * Team whose turn it is.
   */
  @Prop() turn?: Color;

  /**
   * Stencil lifecycle method `render` for `codenames-scores` component.
   */
  render(): HTMLCodenamesScoresElement {
    return (
      <Host>
        <div class="scores-container">
          <div class={Color.Blue + " turn-text"}>{this.turn === Color.Blue ? "← Blue's turn" : ""}</div>
          <div>
            <span class={Color.Blue}>{this.scores?.[Color.Blue] ?? "?"}</span>
            {" - "}
            <span class={Color.Red}>{this.scores?.[Color.Red] ?? "?"}</span>
          </div>
          <div class={Color.Red + " turn-text"}>{this.turn === Color.Red ? "Red's turn →" : ""}</div>
        </div>
      </Host>
    );
  }
}

import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Color, Scores } from "../../extra/types";

@Component({
  tag: 'codenames-scores',
  styleUrl: 'codenames-scores.scss',
  shadow: true,
})
export class CodenamesScores {

  /**
   * Scores to display.
   */
  @Prop() scores?: Scores;

  /**
   * Watcher for `revealed` prop.
   */
  @Watch("scores")
  revealedChanged(): void {
      this.waitForCellSpinner = true;
      setTimeout(() => {
        this.waitForCellSpinner = false;
      }, 300);
  }

  /**
   * Will be `true` while waiting for a cell spinner to finish.
   */
  @State() private waitForCellSpinner: boolean = false;

  /**
   * Stencil lifecycle method `componentShouldUpdate` for `codenames-scores` component.
   */
  componentShouldUpdate(): boolean {
    return this.waitForCellSpinner === false;
  }

  /**
   * Stencil lifecycle method `render` for `codenames-scores` component.
   */
  render(): void {
    return (
      <Host>
        <span class="blue-score">{this.scores?.[Color.Blue] ?? "?"}</span> - <span class="red-score">{this.scores?.[Color.Red] ?? "?"}</span>
      </Host>
    );
  }

}

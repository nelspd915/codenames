import { Component, Prop, h, State, Watch } from "@stencil/core";
import { Color, Mode, Server } from "../../extra/types";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.scss",
  shadow: true
})
export class CodenamesCell {
  /**
   * Library of server utilities.
   */
  @Prop() server: Server;
  /**
   * Index of the cell.
   */
  @Prop() index: number;

  /**
   * Word shown in cell.
   */
  @Prop() word: string = "";

  /**
   * Cell color.
   */
  @Prop() color?: Color = Color.Gray;

  /**
   * Cell display mode.
   */
  @Prop() mode?: Mode = Mode.Normal;

  /**
   * Whether cell is currently loading.
   */
  @Prop() loading?: boolean = false;

  /**
   * Watcher for `revealed` prop.
   */
  @Watch("mode")
  modeChanged(newValue: Mode): void {
    if (newValue === Mode.Endgame) {
      this.loadingEndgame = true;
      setTimeout(() => {
        this.loadingEndgame = false;
      }, 300);
    }
  }

  /**
   * Whether the cell is revealed.
   */
  @Prop() revealed?: boolean = false;

  /**
   * Whether it is currently the user's turn to guess.
   */
  @Prop() canGuess: boolean = false;

  /**
   * Whether loading endgame.
   */
  @State() private loadingEndgame: boolean = false;

  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render(): void {
    return (
      <div
        class={`${this.color} ${!this.loadingEndgame ? this.mode : ""} ${
          this.revealed && !this.loading ? "revealed" : ""
        } ${this.canGuess === false ? "no-guess" : ""}`}
        onClick={this.handleRevealCell}
      >
        {this.loading ? <codenames-spinner></codenames-spinner> : <span>{this.word.toUpperCase()}</span>}
      </div>
    );
  }

  /**
   * Sends request to reveal this cell on the board.
   */
  private handleRevealCell = async (): Promise<void> => {
    if (this.canGuess && this.revealed === false) {
      this.loading = true;
      this.server.revealCell(this.index);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  };
}

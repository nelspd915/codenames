import { Component, Prop, h, State } from "@stencil/core";
import { CellColor, CellMode } from "../../extra/types";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.scss",
  shadow: true,
})
export class CodenamesCell {
  /**
   * Word shown in cell.
   */
  @Prop() word: string = "";

  /**
   * Cell color.
   */
  @Prop() color: CellColor = CellColor.Gray;

  /**
   * Cell display mode.
   */
  @Prop() mode: CellMode = CellMode.Normal;

  /**
   * Whether the cell is revealed.
   */
  @Prop() revealed: boolean = false;

  /**
   * Whether to show loading spinner.
   */
  @State() private showSpinner: boolean = false;

  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render(): void {
    return (
      <div
        class={`${this.color} ${this.mode} ${this.revealed ? "revealed" : ""}`}
        onClick={this.revealCell}
      >
        {this.showSpinner ?
          <codenames-spinner></codenames-spinner> :
          <span>{this.word.toUpperCase()}</span>
        }
      </div>
    );
  }

  /**
   * Sends request to reveal this cell on the board.
   */
  private revealCell = async (): Promise<void> => {
    if (this.mode === CellMode.Normal && this.revealed === false) {
      this.showSpinner = true;
      // TODO: emit reveal event instead of setting own prop
      setTimeout(() => {
        this.showSpinner = false;
        this.revealed = true;
      }, 500);
    }
  }
}

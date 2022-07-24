import { Component, Prop, h, State, Event, EventEmitter, Watch } from "@stencil/core";
import { Color, Mode } from "../../extra/types";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.scss",
  shadow: true,
})
export class CodenamesCell {
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
   * Whether the cell is revealed.
   */
  @Prop() revealed?: boolean = false;

  /**
   * Watcher for `revealed` prop.
   */
  @Watch("revealed")
  revealedChanged(newValue: boolean, oldValue: boolean): void {
    if (newValue === true && oldValue === false) {
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
      }, 300);
    }
  }

  /**
   * Whether to show loading spinner.
   */
  @State() private showSpinner: boolean = false;

  /**
   * Event fired upon clicking a cell to reveal it.
   */
  @Event({ bubbles: true }) revealCell: EventEmitter<number>;

  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render(): void {
    return (
      <div
        class={`${this.color} ${this.mode} ${this.revealed && !this.showSpinner ? "revealed" : ""}`}
        onClick={this.handleRevealCell}
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
  private handleRevealCell = async (): Promise<void> => {
    if (this.mode === Mode.Normal && this.revealed === false) {
      this.revealCell.emit(this.index,);
    }
  }
}

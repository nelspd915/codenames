import { Component, Prop, h } from "@stencil/core";
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
  @Prop({ reflect: true }) loading?: boolean = false;

  /**
   * Whether the cell is revealed.
   */
  @Prop() revealed?: boolean = false;

  /**
   * Whether it is currently the user's turn to guess.
   */
  @Prop() canGuess: boolean = false;

  /**
   * Whether the socket is connected.
   */
  @Prop() socketIsConnected?: boolean = false;

  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render(): HTMLCodenamesCellElement {
    const classList: string[] = [];

    if (!this.loading) {
      classList.push(this.color);
      classList.push(this.mode);
      if (this.revealed) {
        classList.push("revealed");
      }
    }

    if (!this.canGuess || !this.socketIsConnected) {
      classList.push("no-guess");
    }

    const className = classList.join(" ");

    return (
      <div class={className} onClick={this.handleRevealCell}>
        {this.loading ? <codenames-spinner></codenames-spinner> : <span>{this.word.toUpperCase()}</span>}
      </div>
    );
  }

  /**
   * Sends request to reveal this cell on the board.
   */
  private handleRevealCell = async (): Promise<void> => {
    if (this.canGuess && this.revealed === false && this.socketIsConnected) {
      this.loading = true;
      this.server.revealCell(this.index);

      // give up loading if takes too long
      setTimeout(() => {
        if (this.loading) {
          this.loading = false;
        }
      }, 3000);
    }
  };
}

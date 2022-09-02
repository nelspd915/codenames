import { Component, Host, h, Prop } from "@stencil/core";
import { BoardData, Server } from "../../extra/types";

@Component({
  tag: "codenames-board",
  styleUrl: "codenames-board.scss",
  shadow: true
})
export class CodenamesBoard {
  /**
   * Library of server utilities.
   */
  @Prop() server: Server;

  /**
   * Board data used to generate the cells.
   */
  @Prop() boardData?: BoardData;

  /**
   * Whether it is currently the user's turn to guess.
   */
  @Prop() canGuess: boolean = false;

  /**
   * Index of the cell currently loading.
   */
  @Prop() loadingCellIndex: number = -1;

  /**
   * Stencil lifecycle method `render` for `codenames-board` component.
   */
  render(): HTMLCodenamesBoardElement {
    return (
      <Host>
        {this.boardData?.map((cellData, i) => {
          return (
            <codenames-cell
              server={this.server}
              index={i}
              word={cellData.word}
              color={cellData.color}
              mode={cellData.mode}
              revealed={cellData.revealed}
              canGuess={this.canGuess}
              loading={this.loadingCellIndex === i}
            ></codenames-cell>
          );
        }) ?? null}
      </Host>
    );
  }
}

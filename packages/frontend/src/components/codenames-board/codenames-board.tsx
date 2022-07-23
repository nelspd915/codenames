import { Component, Host, h, Prop } from '@stencil/core';
import { BoardData, Requests } from "../../extra/types";

@Component({
  tag: 'codenames-board',
  styleUrl: 'codenames-board.scss',
  shadow: true,
})
export class CodenamesBoard {

  /**
   * Library of requests that can be made to the server
   */
  @Prop() requests: Requests;

  /**
   * Board data used to generate the cells.
   */
  @Prop() boardData?: BoardData;

  /**
   * Stencil lifecycle method `render` for `codenames-board` component.
   */
  render(): void {
    return (
      <Host>
        {this.boardData?.map((cellData, i) => {
          return (
            <codenames-cell
              requests={this.requests}
              index={i}
              word={cellData.word}
              color={cellData.color}
              mode={cellData.mode}
              revealed={cellData.revealed}
            ></codenames-cell>
          )
        }) ?? null}
      </Host>
    );
  }

}

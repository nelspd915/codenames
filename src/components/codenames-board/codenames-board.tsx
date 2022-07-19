import { Component, Host, h, Prop } from '@stencil/core';
import { CellData } from "../../extra/types";

@Component({
  tag: 'codenames-board',
  styleUrl: 'codenames-board.scss',
  shadow: true,
})
export class CodenamesBoard {

  /**
   * Data list used to generate the cells.
   * @length 25
   */
  @Prop() cellDataList?: CellData[];

  /**
   * Stencil lifecycle method `render` for `codenames-board` component.
   */
  render() {
    return (
      <Host>
        {this.cellDataList?.map((cellData) => {
          return (
            <codenames-cell
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

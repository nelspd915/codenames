import { Component, Host, h, Prop } from '@stencil/core';
import { CellData } from "../../extra/types";

@Component({
  tag: 'codenames-board',
  styleUrl: 'codenames-board.css',
  shadow: true,
})
export class CodenamesBoard {

  /**
   * Data list used to generate the cells.
   */
  @Prop() cellDataList?: CellData[];

  render() {
    return (
      <Host>
        {this.cellDataList?.map((cellData) => {
          return (
            <codenames-cell word={cellData.word} color={cellData.color}></codenames-cell>
          )
        }) ?? null}
      </Host>
    );
  }

}

import { Component, Host, h, Prop } from '@stencil/core';
import { CellData } from "../../extra/types";

@Component({
  tag: 'codenames-board',
  styleUrl: 'codenames-board.scss',
  shadow: true,
})
export class CodenamesBoard {

  /**
   * Cell data used to generate the cells.
   */
  @Prop() cellData?: CellData;

  /**
   * Stencil lifecycle method `render` for `codenames-board` component.
   */
  render(): void {
    return (
      <Host>
        {this.cellData?.map((eachCellData) => {
          return (
            <codenames-cell
              word={eachCellData.word}
              color={eachCellData.color}
              mode={eachCellData.mode}
              revealed={eachCellData.revealed}
            ></codenames-cell>
          )
        }) ?? null}
      </Host>
    );
  }

}

import { Component, Host, h } from '@stencil/core';
import axios from "axios";
import { CellData } from "../../extra/types";

@Component({
  tag: 'codenames-app',
  styleUrl: 'codenames-app.scss',
  shadow: true,
})
export class CodenamesApp {

  /**
   * Cell data passed to codenames-board used to generate cells.
   */
  private cellData: CellData;

  /**
   * Stencil lifecycle method `componentWillRender` for `codenames-app` component.
   */
  async componentWillRender(): Promise<void> {
    const res = await axios.get("http://localhost:8080/gameboard");
    this.cellData = res.data;
  }

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render(): void {
    return (
      <Host>
        <codenames-board cellData={this.cellData}></codenames-board>
      </Host>
    );
  }
}

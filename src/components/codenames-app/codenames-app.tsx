import { Component, Host, h } from '@stencil/core';
import axios from "axios";

@Component({
  tag: 'codenames-app',
  styleUrl: 'codenames-app.scss',
  shadow: true,
})
export class CodenamesApp {

  /**
   * Codenames board element to display game state.
   */
  private board: HTMLCodenamesBoardElement;

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render() {
    return (
      <Host>
        <codenames-board ref={(el) => {
          this.board = el;
        }}></codenames-board>
      </Host>
    );
  }

  /**
   * Stencil lifecycle method `componentDidRender` for `codenames-app` component.
   */
  componentDidRender() {
    axios.get("http://127.0.0.1:8000/api/dummyData").then((res) => {
      this.board.cellData = res.data;
    });
  }
}

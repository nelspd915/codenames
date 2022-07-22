import { Component, Host, h, Listen, State } from '@stencil/core';
import { BoardData } from "../../extra/types";
import { io, Socket } from "socket.io-client";
import { PROD_URL } from "../../extra/constants";

@Component({
  tag: 'codenames-app',
  styleUrl: 'codenames-app.scss',
  shadow: true,
})
export class CodenamesApp {

  @Listen("revealCell")
  revealCellHandler(event: CustomEvent<number>): void {
    const cellIndex = event.detail;
    this.socket.emit("revealCell", cellIndex);
  }

  /**
   * Board data passed to codenames-board used to generate cells.
   */
  @State() private boardData: BoardData;

  /**
   * Socket connection with the server.
   */
  private socket: Socket;

  /**
   * Stencil lifecycle method `connectedCallback` for `codenames-app` component.
   */
  async connectedCallback(): Promise<void> {
    this.socket = io(PROD_URL);
    this.socket.on("updateBoard", (boardData: BoardData) => {
      this.boardData = boardData;
    });
  }

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render(): void {
    return (
      <Host>
        <codenames-board boardData={this.boardData}></codenames-board>
      </Host>
    );
  }
}

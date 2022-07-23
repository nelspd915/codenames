import { Component, Host, h, Listen, State } from '@stencil/core';
import { GameData } from "../../extra/types";
import { io, Socket } from "socket.io-client";
import { PROD_URL, DEV_URL } from "../../extra/constants";

@Component({
  tag: 'codenames-app',
  styleUrl: 'codenames-app.scss',
  shadow: true,
})
export class CodenamesApp {

  @Listen("revealCell")
  revealCellHandler(event: CustomEvent<number>): void {
    const cellIndex = event.detail;
    this.socket.emit("revealCell", cellIndex, "poop");
  }

  /**
   * Game data used to populate values on the board and UI.
   */
  @State() private gameData: GameData | undefined;

  /**
   * Client player's username
   */
  @State() private username: string | undefined;

  /**
   * Socket connection with the server.
   */
  private socket: Socket;

  /**
   * Input element for username.
   */
  private usernameInput: HTMLInputElement;

  /**
   * Stencil lifecycle method `connectedCallback` for `codenames-app` component.
   */
  connectedCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("dev") === "true" ? DEV_URL : PROD_URL;
    this.socket = io(url);
    this.socket.on("updateGame", (gameData: GameData) => {
      this.gameData = gameData;
    });
    this.socket.on("connect", () => {
      const cachedUsername = window.localStorage.getItem("codenamesUsername")
      if (cachedUsername !== null) {
        this.username = cachedUsername;
        this.socket.emit("updateUsername", this.socket.id, this.username);
      }
    });
  }

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render(): void {
    return (
      <Host>
        <input ref={(element) => {
          this.usernameInput = element;
        }} />
        <button onClick={this.updateUsernameHandler}>Submit</button>
        <div>{this.username ?? ""}</div><br></br>
        <codenames-scores scores={this.gameData?.scores}></codenames-scores>
        <codenames-board boardData={this.gameData?.board}></codenames-board>
        <button onClick={this.becomeSpymasterHandler}>Spymaster</button>
        <button onClick={this.newGameHandler}>New game</button>
        <button onClick={this.createRoomHandler}>Create Room</button>
        <button onClick={this.JoinRoomHandler}>Join Room</button>
      </Host>
    );
  }

  /**
   * Handler to request username update.
   */
  private updateUsernameHandler = (): void => {
    this.username = this.usernameInput.value;
    window.localStorage.setItem("codenamesUsername", this.username);
    this.socket.emit("updateUsername", this.socket.id, this.username);
  }

  /**
   * Handler to request to become a spymaster.
   */
  private becomeSpymasterHandler = (): void => {
    this.socket.emit("becomeSpymaster", this.username, "poop");
  }

  /**
   * Handler to request to start a new game.
   */
  private newGameHandler = (): void => {
    this.socket.emit("newGame");
  }

  private createRoomHandler = (): void => {
    this.socket.emit("createRoom", "poop", "Kob");
  }

  private JoinRoomHandler = (): void => {
    this.socket.emit("joinRoom", "poop", "Kob");
  }
}

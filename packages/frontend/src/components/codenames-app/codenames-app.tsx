import { Component, Host, h, State } from "@stencil/core";
import { GameData, Requests } from "../../extra/types";
import { io, Socket } from "socket.io-client";
import { PROD_URL, DEV_URL } from "../../extra/constants";

@Component({
  tag: "codenames-app",
  styleUrl: "codenames-app.scss",
  shadow: true
})
export class CodenamesApp {
  /**
   * Game data used to populate values on the board and UI.
   */
  @State() private gameData: GameData | undefined;

  /**
   * Room code.
   */
  @State() private roomCode: string | undefined;

  /**
   * Client player's username.
   */
  @State() private username: string | undefined;

  /**
   * Whether the landing page is shown.
   */
  @State() private showLandingPage: boolean = true;

  /**
   * Socket connection with the server.
   */
  private socket: Socket;

  /**
   * Library of requests that can be made to the server.
   */
  private requests: Requests = {};

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
      // Pull previous room code from local storage if it exists
      const cachedRoomCode = window.localStorage.getItem("codenamesRoomCode");
      if (cachedRoomCode !== null) {
        this.roomCode = cachedRoomCode;
      }

      // Pull previous username from local storage if it exists
      const cachedUsername = window.localStorage.getItem("codenamesUsername");
      if (cachedUsername !== null) {
        this.username = cachedUsername;
      }

      // Setup all requests
      this.requests = {
        revealCell: this.revealCell,
        enterRoom: this.enterRoom,
        becomeSpymaster: this.becomeSpymaster,
        becomeGuesser: this.becomeGuesser,
        newGame: this.newGame
      };
    });
  }

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render(): void {
    return (
      <Host>
        <div class="app-container">
          {this.showLandingPage ? (
            <codenames-landing-page requests={this.requests} roomCode={this.roomCode} username={this.username}></codenames-landing-page>
          ) : (
            <codenames-game
              requests={this.requests}
              gameData={this.gameData}
              userPlayer={this.gameData?.players?.find(player => player.username === this.username)}
            ></codenames-game>
          )}
        </div>
      </Host>
    );
  }

  /**
   * Request to reveal a cell.
   * @param cellIndex
   */
  private revealCell = (cellIndex: number): void => {
    this.socket.emit("revealCell", this.roomCode, cellIndex);
  };

  /**
   * Request to enter room.
   * @param roomCode
   * @param username
   */
  private enterRoom = (roomCode: string, username: string): void => {
    this.roomCode = roomCode;
    this.username = username;
    window.localStorage.setItem("codenamesRoomCode", this.roomCode);
    window.localStorage.setItem("codenamesUsername", this.username);
    this.socket.emit("enterRoom", this.roomCode, this.username);
    this.showLandingPage = false;
  };

  /**
   * Request to become a spymaster.
   */
  private becomeSpymaster = (): void => {
    this.socket.emit("becomeSpymaster", this.roomCode, this.username);
  };

  /**
   * Request to become a spymaster.
   */
  private becomeGuesser = (): void => {
    this.socket.emit("becomeGuesser", this.roomCode, this.username);
  };

  /**
   * Request to start a new game.
   */
  private newGame = (): void => {
    this.socket.emit("newGame", this.roomCode);
  };
}

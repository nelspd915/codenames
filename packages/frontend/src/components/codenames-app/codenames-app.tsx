import { Component, Host, h, State } from "@stencil/core";
import { Color, GameData, Server } from "../../extra/types";
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
  @State() private gameData?: GameData;

  /**
   * Room code.
   */
  @State() private roomCode?: string;

  /**
   * Client player's username.
   */
  @State() private username?: string;

  /**
   * Whether the landing page is shown.
   */
  @State() private showLandingPage: boolean = true;

  /**
   * Whether the socket is connected.
   */
  @State() private socketIsConnected: boolean = false;

  /**
   * Socket connection with the server.
   */
  private socket: Socket;

  /**
   * Library of server utilities.
   */
  private server: Server = {};

  /**
   * Stencil lifecycle method `connectedCallback` for `codenames-app` component.
   */
  connectedCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const devParam = urlParams.get("dev");
    const url = devParam === "true" ? DEV_URL : PROD_URL;

    // Pull previous room code from local storage if it exists
    const cachedRoomCode = window.localStorage.getItem("codenamesRoomCode");
    this.roomCode = urlParams.get("roomCode") ?? cachedRoomCode ?? "";

    // Pull previous username from local storage if it exists
    const cachedUsername = window.localStorage.getItem("codenamesUsername");
    this.username = cachedUsername ?? "";

    this.socket = io(url);

    this.socket.on("connect", () => {
      this.socketIsConnected = this.socket.connected;
    });

    this.socket.on("updateGame", (gameData: GameData) => {
      this.gameData = gameData;
      console.log("gameData", this.gameData);
    });

    this.socket.io.on("reconnect", () => {
      this.reconnectOldSocket();
    });

    this.socket.on("disconnect", (reason: any) => {
      this.socketIsConnected = this.socket.connected;
      console.log("DISCONNECTED socket because: ", reason);
    });

    // Setup server utilities
    this.server = {
      socket: this.socket,
      revealCell: this.revealCell,
      enterRoom: this.enterRoom,
      becomeSpymaster: this.becomeSpymaster,
      becomeGuesser: this.becomeGuesser,
      newGame: this.newGame,
      joinTeam: this.joinTeam,
      endTurn: this.endTurn,
      randomizeTeams: this.randomizeTeams,
      leaveRoom: this.leaveRoom
    };
  }

  /**
   * Stencil lifecycle method `render` for `codenames-app` component.
   */
  render(): HTMLCodenamesAppElement {
    return (
      <Host>
        <div class="app-container">
          {this.showLandingPage ? (
            <codenames-landing-page
              server={this.server}
              socketIsConnected={this.socketIsConnected}
              roomCode={this.roomCode}
              username={this.username}
            ></codenames-landing-page>
          ) : (
            <codenames-game
              server={this.server}
              socketIsConnected={this.socketIsConnected}
              gameData={this.gameData}
              userPlayer={this.gameData?.players?.find((player) => player.username === this.username)}
            ></codenames-game>
          )}
        </div>
        <div class="loader" hidden={this.socketIsConnected}>
          <div class="loader-bar"></div>
        </div>
      </Host>
    );
  }

  /**
   * Request to reconnect existing socket.
   */
  private reconnectOldSocket = (): void => {
    this.socket.emit("reconnectOldSocket", this.roomCode, this.username);
  };

  /**
   * Request to reveal a cell.
   * @param cellIndex
   */
  private revealCell = (cellIndex: number): void => {
    if (this.socketIsConnected) {
      this.socket.emit("revealCell", cellIndex);
    }
  };

  /**
   * Request to enter room.
   * @param roomCode
   * @param username
   */
  private enterRoom = (roomCode: string, username: string): void => {
    if (this.socketIsConnected) {
      this.roomCode = roomCode;
      this.username = username;
      window.localStorage.setItem("codenamesRoomCode", this.roomCode);
      window.localStorage.setItem("codenamesUsername", this.username);
      this.socket.emit("enterRoom", this.roomCode, this.username);
      this.showLandingPage = false;
    }
  };

  /**
   * Request to become a spymaster.
   */
  private becomeSpymaster = (): void => {
    if (this.socketIsConnected) {
      this.socket.emit("becomeSpymaster");
    }
  };

  /**
   * Request to become a spymaster.
   */
  private becomeGuesser = (): void => {
    if (this.socketIsConnected) {
      this.socket.emit("becomeGuesser");
    }
  };

  /**
   * Request to start a new game.
   */
  private newGame = (): void => {
    if (this.socketIsConnected) {
      this.socket.emit("newGame");
    }
  };

  /**
   * Request to join a team.
   */
  private joinTeam = (color: Color): void => {
    if (this.socketIsConnected) {
      this.socket.emit("joinTeam", color);
    }
  };

  /**
   * Request to end the turn.
   */
  private endTurn = (): void => {
    if (this.socketIsConnected) {
      this.socket.emit("endTurn");
    }
  };

  /**
   * Request to randomize teams.
   */
  private randomizeTeams = (): void => {
    if (this.socketIsConnected) {
      this.socket.emit("randomizeTeams");
    }
  };

  /**
   * Leave room.
   */
   private leaveRoom = (): void => {
    if (this.socketIsConnected) {
      this.showLandingPage = true;
      this.socket.emit("leaveRoom");
    }
  };
}

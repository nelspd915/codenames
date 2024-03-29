import { Component, Host, h, Prop, State } from "@stencil/core";
import { Server } from "../../extra/types";

@Component({
  tag: "codenames-landing-page",
  styleUrl: "codenames-landing-page.scss",
  shadow: true
})
export class CodenamesLandingPage {
  /**
   * Library of server utilities.
   */
  @Prop() server: Server;

  /**
   * Whether the socket is connected.
   */
  @Prop() socketIsConnected?: boolean = false;

  /**
   * Username currently entered.
   */
  @Prop() username?: string = "";

  /**
   * Room code currently entered.
   */
  @Prop() roomCode?: string = "";

  /**
   * Warning message to show.
   */
  @State() message: string = "";

  /**
   * Input element for username.
   */
  private usernameInput: HTMLInputElement;

  /**
   * Input element for room code.
   */
  private roomCodeInput: HTMLInputElement;

  /**
   * Stencil lifecycle method `render` for `codenames-landing-page` component.
   */
  render() {
    return (
      <Host>
        <div class="section header">CODENAMES</div>
        <div class="section">
          <div class="input-title">Username: </div>
          <input
            value={this.username}
            required={true}
            maxLength={10}
            ref={(element) => {
              this.usernameInput = element;
            }}
          />
        </div>
        <div class="section">
          <div class="input-title">Room code: </div>
          <input
            value={this.roomCode}
            required={true}
            maxLength={10}
            ref={(element) => {
              this.roomCodeInput = element;
            }}
          />
        </div>
        <codenames-button hoverCursor={this.socketIsConnected} onClick={this.submitHandler}>
          Submit
        </codenames-button>
        <div class="section message">{this.message}</div>
      </Host>
    );
  }

  /**
   * Handler to submit username and room code.
   */
  private submitHandler = (): void => {
    this.username = this.usernameInput.value;
    this.roomCode = this.roomCodeInput.value;

    if (this.username !== "" && this.roomCode !== "") {
      this.server.enterRoom(this.roomCode, this.username);
    } else {
      this.message = "Please fill out both fields.";
    }
  };
}

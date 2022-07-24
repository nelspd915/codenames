import { Component, Host, h, Prop } from '@stencil/core';
import { Requests } from "../../extra/types";

@Component({
  tag: 'codenames-landing-page',
  styleUrl: 'codenames-landing-page.scss',
  shadow: true,
})
export class CodenamesLandingPage {

  /**
   * Library of requests that can be made to the server.
   */
  @Prop() requests: Requests;

  /**
   * Username currently entered.
   */
  @Prop() username?: string;

  /**
   * Input element for username.
   */
  private usernameInput: HTMLInputElement;

  /**
   * Stencil lifecycle method `render` for `codenames-landing-page` component.
   */
  render() {
    return (
      <Host>
        <input value={this.username} ref={(element) => {
          this.usernameInput = element;
        }} />
        <button onClick={this.submitUsernameHandler}>Submit</button>
      </Host>
    );
  }

  /**
   * Handler to submit username.
   */
  private submitUsernameHandler = (): void => {
    this.username = this.usernameInput.value;
    this.requests.updateUsername(this.username);
  }

}

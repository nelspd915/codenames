import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'codenames-spinner',
  styleUrl: 'codenames-spinner.scss',
  shadow: true,
})
export class CodenamesSpinner {

  render() {
    return (
      <Host>
        <div class="lds-dual-ring"></div>
      </Host>
    );
  }

}

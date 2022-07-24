import { Component, h, Prop } from "@stencil/core";
import { Color } from "../../extra/types";

@Component({
  tag: "codenames-button",
  styleUrl: "codenames-button.scss",
  shadow: true
})
export class CodenamesButton {
  /**
   * Button color.
   */
  @Prop() color?: Color;

  /**
   * Whether button is on.
   */
  @Prop() on?: boolean;

  /**
   * Stencil lifecycle method `render` for `codenames-button` component.
   */
  render() {
    return (
      <div class={`button-container ${this.color ?? ""} ${this.on ? "on" : ""}`}>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    );
  }
}

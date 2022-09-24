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
   * Whether the cursor should change on hover.
   */
  @Prop() hoverCursor?: boolean;

  /**
   * Stencil lifecycle method `render` for `codenames-button` component.
   */
  render() {
    const classList = ["button-container"];
    if (this.color) classList.push(this.color);
    if (this.on) classList.push("on");
    if (this.hoverCursor === false) classList.push("no-hover");

    return (
      <div class={classList.join(" ")}>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    );
  }
}

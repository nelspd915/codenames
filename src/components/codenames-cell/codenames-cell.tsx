import { Component, Prop, h, Host } from "@stencil/core";
import { CellColor } from "../../extra/types";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.css",
  shadow: true,
})
export class CodenamesCell {
  /**
   * Word shown in cell.
   */
  @Prop({ reflect: true }) word: string;

  /**
   * Cell color.
   */
  @Prop({ reflect: true }) color: CellColor;

  render() {
    return <Host class={this.color}>
      <span class={"word"}>{this.word.toUpperCase()}</span>
    </Host>;
  }
}

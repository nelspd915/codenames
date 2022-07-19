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
  @Prop() word: string = "";

  /**
   * Cell color.
   */
  @Prop() color: CellColor = CellColor.Gray;

  render() {
    return <Host class={this.color}>
      <span class={"word"}>{this.word.toUpperCase()}</span>
    </Host>;
  }
}

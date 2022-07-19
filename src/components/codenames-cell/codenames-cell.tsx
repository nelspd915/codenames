import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.css",
  shadow: true,
})
export class CodenamesCell {
  /**
   * Word shown in cell.
   */
  @Prop() word: string;

  /**
   * Cell color.
   */
  @Prop() color: CellColor;

  render() {
    return <Host class={this.color}>
      <span class={"word"}>{this.word.toUpperCase()}</span>
    </Host>;
  }
}

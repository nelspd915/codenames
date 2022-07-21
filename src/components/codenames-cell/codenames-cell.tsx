import { Component, Prop, h } from "@stencil/core";
import { CellColor, CellMode } from "../../extra/types";

@Component({
  tag: "codenames-cell",
  styleUrl: "codenames-cell.scss",
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

  /**
   * Cell display mode.
   */
  @Prop() mode: CellMode = CellMode.Normal;

  /**
   * Whether the cell is revealed.
   */
  @Prop() revealed: boolean = false;

  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render(): void {
    return <div class={`${this.color} ${this.mode} ${this.revealed ? "revealed" : ""}`}>
      <span class={"word"}>{this.word.toUpperCase()}</span>
    </div>;
  }
}

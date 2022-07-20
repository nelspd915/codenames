import { r as registerInstance, h } from './index-7f14832d.js';

/**
 * Enumerator for possible cell colors.
 */
var CellColor;
(function (CellColor) {
  CellColor["Blue"] = "blue";
  CellColor["Red"] = "red";
  CellColor["Gray"] = "gray";
  CellColor["Black"] = "black";
})(CellColor || (CellColor = {}));
/**
 * Possible display modes for a cell.
 */
var CellMode;
(function (CellMode) {
  CellMode["Normal"] = "normal";
  CellMode["Spymaster"] = "spymaster";
  CellMode["Endgame"] = "endgame";
})(CellMode || (CellMode = {}));

const codenamesCellCss = ":host{width:18%;height:17%}div{display:flex;justify-content:center;align-items:center;text-align:center;width:100%;height:100%;font-family:Roboto, verdana, sans-serif;font-size:15pt;background:#e8e8e8}.blue.spymaster{color:#4183cc;font-weight:bold}.blue.revealed{background:#4183cc;color:#ffffff}.blue.endgame{background:#a6c7ee}.red.spymaster{color:#d13030;font-weight:bold}.red.revealed{background:#d13030;color:#ffffff}.red.endgame{background:#ecabab}.gray.spymaster{color:#000000;font-weight:bold}.gray.revealed{background:#8e8e8e;color:#ffffff}.black.spymaster{background:#999999;outline:5px solid #000000;font-weight:bold}.black.revealed,.black.endgame{background:#000000;color:#ffffff;outline:0}.word{vertical-align:middle;display:inline-block}";

const CodenamesCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Word shown in cell.
     */
    this.word = "";
    /**
     * Cell color.
     */
    this.color = CellColor.Gray;
    /**
     * Cell display mode.
     */
    this.mode = CellMode.Normal;
    /**
     * Whether the cell is revealed.
     */
    this.revealed = false;
  }
  /**
   * Stencil lifecycle method `render` for `codenames-cell` component.
   */
  render() {
    return h("div", { class: `${this.color} ${this.mode} ${this.revealed ? "revealed" : ""}` }, h("span", { class: "word" }, this.word.toUpperCase()));
  }
};
CodenamesCell.style = codenamesCellCss;

export { CodenamesCell as codenames_cell };

//# sourceMappingURL=codenames-cell.entry.js.map
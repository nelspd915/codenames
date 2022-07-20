import { r as registerInstance, h, e as Host } from './index-7f14832d.js';

const codenamesBoardCss = ":host{display:flex;margin:50px;flex-wrap:wrap;justify-content:space-between;height:600px}";

const CodenamesBoard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  /**
   * Stencil lifecycle method `render` for `codenames-board` component.
   */
  render() {
    var _a, _b;
    return (h(Host, null, (_b = (_a = this.cellData) === null || _a === void 0 ? void 0 : _a.map((eachCellData) => {
      return (h("codenames-cell", { word: eachCellData.word, color: eachCellData.color, mode: eachCellData.mode, revealed: eachCellData.revealed }));
    })) !== null && _b !== void 0 ? _b : null));
  }
};
CodenamesBoard.style = codenamesBoardCss;

export { CodenamesBoard as codenames_board };

//# sourceMappingURL=codenames-board.entry.js.map
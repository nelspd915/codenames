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

export { CellColor as C, CellMode as a };

//# sourceMappingURL=types-02046d2b.js.map
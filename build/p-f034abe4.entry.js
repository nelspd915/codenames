import{r as e,h as o,H as r}from"./p-4578d37f.js";const a=":host{display:flex;margin:50px;flex-wrap:wrap;justify-content:space-between;height:600px}";const t=class{constructor(o){e(this,o)}render(){var e,a;return o(r,null,(a=(e=this.cellData)===null||e===void 0?void 0:e.map((e=>o("codenames-cell",{word:e.word,color:e.color,mode:e.mode,revealed:e.revealed}))))!==null&&a!==void 0?a:null)}};t.style=a;var l;(function(e){e["Blue"]="blue";e["Red"]="red";e["Gray"]="gray";e["Black"]="black"})(l||(l={}));var n;(function(e){e["Normal"]="normal";e["Spymaster"]="spymaster";e["Endgame"]="endgame"})(n||(n={}));const s=":host{width:18%;height:17%}div{display:flex;justify-content:center;align-items:center;text-align:center;width:100%;height:100%;font-family:Roboto, verdana, sans-serif;font-size:15pt;background:#e8e8e8}.blue.spymaster{color:#4183cc;font-weight:bold}.blue.revealed{background:#4183cc;color:#ffffff}.blue.endgame{background:#a6c7ee}.red.spymaster{color:#d13030;font-weight:bold}.red.revealed{background:#d13030;color:#ffffff}.red.endgame{background:#ecabab}.gray.spymaster{color:#000000;font-weight:bold}.gray.revealed{background:#8e8e8e;color:#ffffff}.black.spymaster{background:#999999;outline:5px solid #000000;font-weight:bold}.black.revealed,.black.endgame{background:#000000;color:#ffffff;outline:0}.word{vertical-align:middle;display:inline-block}";const c=class{constructor(o){e(this,o);this.word="";this.color=l.Gray;this.mode=n.Normal;this.revealed=false}render(){return o("div",{class:`${this.color} ${this.mode} ${this.revealed?"revealed":""}`},o("span",{class:"word"},this.word.toUpperCase()))}};c.style=s;export{t as codenames_board,c as codenames_cell};
//# sourceMappingURL=p-f034abe4.entry.js.map
import { r as registerInstance, h, e as Host } from './index-a676ed0a.js';

const codenamesSpinnerCss = ":host{display:block}.lds-dual-ring:after{content:\" \";display:block;width:32px;height:32px;margin:4px;border-radius:50%;border:4px solid #000;border-color:#000 transparent #000 transparent;animation:lds-dual-ring 1.2s linear infinite}@keyframes lds-dual-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const CodenamesSpinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", { class: "lds-dual-ring" })));
  }
};
CodenamesSpinner.style = codenamesSpinnerCss;

export { CodenamesSpinner as codenames_spinner };

//# sourceMappingURL=codenames-spinner.entry.js.map
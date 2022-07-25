import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Color } from "../../extra/types";
import { CodenamesPanel } from "./codenames-panel";

describe("codenames-panel", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesPanel],
      template: () => <codenames-panel requests={{}} panelTeam={Color.Blue}></codenames-panel>
    });
    expect(page.root).toBeTruthy();
  });
});

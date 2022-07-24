import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesGame } from "./codenames-game";

describe("codenames-game", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesGame],
      template: () => <codenames-game requests={{}}></codenames-game>
    });
    expect(page.root).toBeTruthy();
  });
});

import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesButton } from "./codenames-button";

describe("codenames-button", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesButton],
      template: () => <codenames-button></codenames-button>
    });
    expect(page.root).toBeTruthy();
  });
});

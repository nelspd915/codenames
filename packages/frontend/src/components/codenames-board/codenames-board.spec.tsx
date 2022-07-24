import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesBoard } from "./codenames-board";

describe("codenames-board", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesBoard],
      template: () => <codenames-board requests={{}}></codenames-board>
    });
    expect(page.root).toBeTruthy();
  });
});

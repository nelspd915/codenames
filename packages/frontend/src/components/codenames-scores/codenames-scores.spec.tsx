import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesScores } from "./codenames-scores";

describe("codenames-scores", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesScores],
      template: () => <codenames-scores></codenames-scores>
    });
    expect(page.root).toBeTruthy();
  });
});

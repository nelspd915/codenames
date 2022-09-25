import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Color, STARTING_SCORES } from "../../extra/types";
import { CodenamesScores } from "./codenames-scores";

describe("codenames-scores", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesScores],
      template: () => <codenames-scores scores={STARTING_SCORES} turn={Color.Blue}></codenames-scores>
    });
    expect(page.root).toBeTruthy();
  });
});

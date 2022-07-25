import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesLandingPage } from "./codenames-landing-page";

describe("codenames-landing-page", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesLandingPage],
      template: () => <codenames-landing-page requests={{}}></codenames-landing-page>
    });
    expect(page.root).toBeTruthy();
  });
});

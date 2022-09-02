import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Server } from "../../extra/types";
import { CodenamesLandingPage } from "./codenames-landing-page";

describe("codenames-landing-page", () => {
  const mockServer = {
    socket: {
      on: () => {}
    }
  } as unknown as Server;
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesLandingPage],
      template: () => <codenames-landing-page server={mockServer}></codenames-landing-page>
    });
    expect(page.root).toBeTruthy();
  });
});

import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Color, Server } from "../../extra/types";
import { CodenamesPanel } from "./codenames-panel";

describe("codenames-panel", () => {
  const mockServer = {
    socket: {
      on: () => {}
    }
  } as unknown as Server;
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesPanel],
      template: () => <codenames-panel server={mockServer} panelTeam={Color.Blue}></codenames-panel>
    });
    expect(page.root).toBeTruthy();
  });
});

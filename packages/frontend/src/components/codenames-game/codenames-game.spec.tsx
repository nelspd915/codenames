import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Server } from "../../extra/types";
import { CodenamesGame } from "./codenames-game";

describe("codenames-game", () => {
  const mockServer = {
    socket: {
      on: () => {}
    }
  } as unknown as Server;
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesGame],
      template: () => <codenames-game server={mockServer}></codenames-game>
    });
    expect(page.root).toBeTruthy();
  });
});

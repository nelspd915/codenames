import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { Server } from "../../extra/types";
import { CodenamesBoard } from "./codenames-board";

describe("codenames-board", () => {
  const mockServer = {
    socket: {
      on: () => {}
    }
  } as unknown as Server;
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CodenamesBoard],
      template: () => <codenames-board server={mockServer}></codenames-board>
    });
    expect(page.root).toBeTruthy();
  });
});

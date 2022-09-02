import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { CodenamesCell } from "./codenames-cell";
import { Color, Server } from "../../extra/types";

describe("codenames-cell", () => {
  const mockServer = {
    socket: {
      on: () => {}
    }
  } as unknown as Server;
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [CodenamesCell],
      template: () => <codenames-cell server={mockServer} word="ivory" color={Color.Blue}></codenames-cell>
    });
    expect(root).toBeTruthy();
    expect(root.tagName).toBe("CODENAMES-CELL");
    expect(root.word).toBe("ivory");
    expect(root.color).toBe(Color.Blue);
  });
});

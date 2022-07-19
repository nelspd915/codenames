import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CodenamesCell } from '../codenames-cell';
import { CellColor } from "../../../extra/types";

describe('codenames-cell', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CodenamesCell],
      template: () => <codenames-cell word="ivory" color={CellColor.Blue}></codenames-cell>,
    });
    console.log(root);
    expect(root).toBeTruthy();
    expect(root.tagName).toBe("CODENAMES-CELL");
    expect(root.word).toBe("ivory");
    expect(root.color).toBe(CellColor.Blue);
  });
});

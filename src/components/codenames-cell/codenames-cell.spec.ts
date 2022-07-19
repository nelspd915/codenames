import { newSpecPage } from '@stencil/core/testing';
import { CodenamesCell } from './codenames-cell';

describe('codenames-cell', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CodenamesCell],
      html: '<codenames-cell></codenames-cell>',
    });
    expect(root).toEqualHtml(`
      <codenames-cell></codenames-cell>
    `);
  });
});

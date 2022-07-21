import { newSpecPage } from '@stencil/core/testing';
import { CodenamesBoard } from './codenames-board';

describe('codenames-board', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesBoard],
      html: `<codenames-board></codenames-board>`,
    });
    expect(page.root).toBeTruthy();
  });
});

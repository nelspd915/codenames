import { newSpecPage } from '@stencil/core/testing';
import { CodenamesPanel } from './codenames-panel';

describe('codenames-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesPanel],
      html: `<codenames-panel></codenames-panel>`,
    });
    expect(page.root).toBeTruthy();
  });
});

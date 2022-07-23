import { newSpecPage } from '@stencil/core/testing';
import { CodenamesLeftPanel } from './codenames-left-panel';

describe('codenames-left-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesLeftPanel],
      html: `<codenames-left-panel></codenames-left-panel>`,
    });
    expect(page.root).toBeTruthy();
  });
});

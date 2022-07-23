import { newSpecPage } from '@stencil/core/testing';
import { CodenamesButton } from './codenames-button';

describe('codenames-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesButton],
      html: `<codenames-button></codenames-button>`,
    });
    expect(page.root).toBeTruthy();
  });
});

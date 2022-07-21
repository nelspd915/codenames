import { newSpecPage } from '@stencil/core/testing';
import { CodenamesApp } from './codenames-app';

describe('codenames-app', () => {
  it.skip('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesApp],
      html: `<codenames-app></codenames-app>`,
    });
    expect(page.root).toBeTruthy();
  });
});

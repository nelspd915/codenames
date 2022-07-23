import { newSpecPage } from '@stencil/core/testing';
import { CodenamesLandingPage } from './codenames-landing-page';

describe('codenames-landing-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesLandingPage],
      html: `<codenames-landing-page></codenames-landing-page>`,
    });
    expect(page.root).toBeTruthy();
  });
});

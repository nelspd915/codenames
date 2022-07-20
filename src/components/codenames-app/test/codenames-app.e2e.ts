import { newE2EPage } from '@stencil/core/testing';

describe('codenames-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<codenames-app></codenames-app>');

    const element = await page.find('codenames-app');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('codenames-board', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<codenames-board></codenames-board>');

    const element = await page.find('codenames-board');
    expect(element).toHaveClass('hydrated');
  });
});

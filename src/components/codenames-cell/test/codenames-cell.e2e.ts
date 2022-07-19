import { newE2EPage } from '@stencil/core/testing';

describe('codenames-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<codenames-cell></codenames-cell>');
    const element = await page.find('codenames-cell');
    expect(element).toHaveClass('hydrated');
  });
});

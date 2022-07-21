import { newSpecPage } from '@stencil/core/testing';
import { CodenamesSpinner } from './codenames-spinner';

describe('codenames-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodenamesSpinner],
      html: `<codenames-spinner></codenames-spinner>`,
    });
    expect(page.root).toBeTruthy();
  });
});

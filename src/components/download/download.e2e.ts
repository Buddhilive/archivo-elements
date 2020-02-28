import { newE2EPage } from '@stencil/core/testing';

describe('archivo-download', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<archivo-download></archivo-download>');

    const element = await page.find('archivo-download');
    expect(element).toHaveClass('hydrated');
  });
});

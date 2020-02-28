import { newE2EPage } from '@stencil/core/testing';

describe('archivo-upload', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<archivo-upload></archivo-upload>');

    const element = await page.find('archivo-upload');
    expect(element).toHaveClass('hydrated');
  });
});

import { AngelsiftPage } from './app.po';

describe('angelsift App', () => {
  let page: AngelsiftPage;

  beforeEach(() => {
    page = new AngelsiftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { CourseprojectPage } from './app.po';

describe('courseproject App', function() {
  let page: CourseprojectPage;

  beforeEach(() => {
    page = new CourseprojectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

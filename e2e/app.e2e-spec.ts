import { MeetingtimerPage } from './app.po';

describe('meetingtimer App', () => {
  let page: MeetingtimerPage;

  beforeEach(() => {
    page = new MeetingtimerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

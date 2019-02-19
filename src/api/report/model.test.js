import { Report } from '.';
import { User } from '../user';

let user, report;

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' });
  report = await Report.create({ user, name: 'test', body: 'test', post_id: 'test', user_id: 'test', authod_id: 'test', status: true });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = report.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(report.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.name).toBe(report.name);
    expect(view.body).toBe(report.body);
    expect(view.status).toBe(report.status);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = report.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(report.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.name).toBe(report.name);
    expect(view.body).toBe(report.body);
    expect(view.post_id).toBe(report.post_id);
    expect(view.user_id).toBe(report.user_id);
    expect(view.authod_id).toBe(report.authod_id);
    expect(view.status).toBe(report.status);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

import { Notification } from '.';
import { User } from '../user';

let notification;
let user;

beforeEach(async () => {
  user = await User.create({ email: 'test@mail.ru', password: '1234567890' });
  notification = await Notification.create({ target: user.id, title: 'test', body: 'test body', type: 'system', picture: 'https://vk.com/favicon.ico', url: '', user });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = notification.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(notification.id);
    expect(view.title).toBe(notification.title);
    expect(view.body).toBe(notification.body);
    expect(view.type).toBe(notification.type);
    expect(view.picture).toBe(notification.picture);
    expect(view.url).toBe(notification.url);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

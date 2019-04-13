import { Messages } from '.';
import { User } from '../user';

let user, messages;

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' });
  messages = await Messages.create({ user, body: 'test', attachments: 'test' });
});

describe('view', () => {
  it('returns simple view', async () => {
    const view = await messages.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(messages.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.body).toBe(messages.body);
    expect(view.attachments).toBe(messages.attachments);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', async () => {
    const view = await messages.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(messages.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.body).toBe(messages.body);
    expect(view.attachments).toBe(messages.attachments);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

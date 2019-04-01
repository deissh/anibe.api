import { Comment } from '.';
import { User } from '../user';

let user, comment;

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' });
  comment = await Comment.create({ user, post_id: 'test', body: 'test' });
});

describe('view', () => {
  it('returns simple view', async () => {
    const view = await comment.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(comment.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.body).toBe(comment.body);
  });

  it('returns full view', async () => {
    const view = await comment.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(comment.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.post_id).toBe(comment.post_id);
    expect(view.body).toBe(comment.body);
    expect(view.rating).toBe(comment.rating);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

import { PasswordReset } from '.';
import { User } from '../user';

let passwordReset;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  passwordReset = await PasswordReset.create({ user });
});

describe('view', () => {
  it('returns simple view', async () => {
    const view = await passwordReset.view();
    expect(view.token).toBe(passwordReset.token);
    expect(typeof view.user).toBe('object');
  });

  it('returns full view', async () => {
    const view = await passwordReset.view(true);
    expect(view.token).toBe(passwordReset.token);
    expect(view.user).toEqual(await passwordReset.user.view(true));
  });
});

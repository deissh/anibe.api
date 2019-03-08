import { OnlineUsers } from './index';

describe('User namespace', () => {
  it('Shoud add to users', async () => {
    await OnlineUsers.set('123312', true);
    expect(await OnlineUsers.get('123312'), true);
  });
});

import { sign } from '../../services/jwt';
import { success } from '../../services/response/';

export const login = async ({ user }, res, next) =>
  sign(await user.view(false))
    .then(async (token) => ({ token, user: await user.view(true) }))
    .then(success(res, 201))
    .catch(next);

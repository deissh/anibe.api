import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import { jwtSecret } from '../../config';

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

export const sign = (user, options, method = jwtSign) =>
  method(user, jwtSecret, options);

export const signSync = (user, options) => sign(user, options, jwt.sign);

export const verify = (token) => jwtVerify(token, jwtSecret);

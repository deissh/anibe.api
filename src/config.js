/* eslint-disable no-unused-vars */
import path from 'path';
import merge from 'lodash/merge';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

const dotenv = require('dotenv-safe');
dotenv.load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example')
});

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 8080,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@api.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    cdnUrl: 'https://cdn.anibe.ru',
    mongo: {
      options: {
        db: {
          safe: true
        },
        useNewUrlParser: true
      },
      uri: process.env.MONGODB_URI || 'mongodb://localhost/api'
    }
  },
  test: { },
  development: {
    mongo: {
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || '127.0.0.1',
    port: process.env.PORT || 8080
  }
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;

const io = require('@pm2/io');

io.init({
  transactions: true, // will enable the transaction tracing
  metrics: {
    network: {
      ports: true
    },
    http: true
  }
});

require('babel-core/register');

exports = module.exports = require('./app');

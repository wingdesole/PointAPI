const express = require('express');
const bodyParser = require('body-parser');
const merchants = require('../routes/merchants');
const users = require('../routes/users');
const transactions = require('../routes/transactions')
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/transactions', transactions);
  app.use('/api/merchants', merchants);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Merchant, validate} = require('../models/merchant');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const merchant = await Merchant.findById(req.merchant._id).select('-password');
  res.send(merchant);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let merchant = await Merchant.findOne({ username: req.body.username });
  if (merchant) return res.status(400).send('Merchant already registered.');

  merchant = new Merchant(_.pick(req.body, ['username', 'store_name', 'password']));
  const salt = await bcrypt.genSalt(10);
  merchant.password = await bcrypt.hash(merchant.password, salt);
  await merchant.save();

  const token = merchant.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(merchant, ['_id', 'username', 'store_name', 'point']));
});

module.exports = router; 

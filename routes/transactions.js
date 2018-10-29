const {Transaction, validate} = require('../models/transaction'); 
const {User} = require('../models/user');
const {Merchant} = require ('../models/merchant');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', auth, async (req, res) => {
  const transactions = await Transaction.find().sort('-id');
  res.send(transactions);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  const merchant = await Merchant.findById(req.body.merchantId);
  if (!merchant) return res.status(400).send('Invalid merchant.');

  const amount = req.body.amount;
  if (amount > user.point) return res.status(400).send('Not enough point');

  let transaction = new Transaction({ 
    sender: {
      _id: user._id,
      name: user.name
    },
    receiver: {
      _id: merchant._id,
      store: merchant.store_name
    },
    amount: amount
  });

  try {
    new Fawn.Task()
      .save('transactions', transaction)
      .update('user', { _id: user._id }, { 
        $inc: { point: -{amount} }
      })
      .update('merchant', { _id: merchant_id},
      {$inc: {point: +{amount}}})
      .run();
  
    res.send(transaction);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) return res.status(404).send('The transaction not found.');

  res.send(transaction);
});

module.exports = router; 
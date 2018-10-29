const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const transactionSchema = new mongoose.Schema({
  date: Date,
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

transactionSchema.statics.lookup = function(userId, merchantId) {
  return this.findOne({
    'user._id': userId,
    'merchant._id': merchantId
  });
}

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(transaction) {
  const schema = {
    userId: Joi.objectId().required(),
    merchantId: Joi.objectId().required(),
    amount:Joi.number().required()
  };

  return Joi.validate(transaction, schema);
}

exports.Transaction = Transaction; 
exports.validate = validateTransaction;
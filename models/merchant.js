const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  store_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  point: {
    type: Number,
    default: 0
  },
  isAdminRole: Boolean
});

merchantSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const Merchant = mongoose.model('Merchant', merchantSchema);

function validateMerchant(merchant) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    store_name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(merchant, schema);
}

exports.Merchant = Merchant; 
exports.validate = validateMerchant;
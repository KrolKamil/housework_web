const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}));

const userAuthErrorObject = (message) => {
  return {
    auth: false,
    message: message || 'unknown'
  };
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validateAsync(user);
};

exports.User = User;
exports.validateUser = validateUser;
exports.userAuthErrorObject = userAuthErrorObject;

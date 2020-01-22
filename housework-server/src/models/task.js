const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Task = mongoose.model('Task', new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true
  },
  description: {
    type: String,
    maxlength: 200,
    minlength: 0,
    default: ''
  },
  timestamp: {
    type: Date,
    required: true
  },
  position: {
    type: String,
    enum: ['TODO', 'INPROGRESS', 'DONE'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}));

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(0).max(200).allow(''),
    timestamp: Joi.date().timestamp().required()
  });
  return schema.validateAsync(task);
};

const validateTaskEdit = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(30),
    description: Joi.string().min(0).max(200).allow('')
  });
  return schema.validateAsync(task);
};

const validTaskPosition = (position) => {
  const positions = ['TODO', 'INPROGRESS', 'DONE'];
  if (positions.includes(position)) {
    return true;
  }
  return false;
};

exports.Task = Task;
exports.validateTask = validateTask;
exports.validTaskPosition = validTaskPosition;
exports.validateTaskEdit = validateTaskEdit;

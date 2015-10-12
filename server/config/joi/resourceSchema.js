'use strict';

var Joi = require('joi');

module.exports.schema = Joi.object().keys({
  id: Joi.number().integer().required(),
  type: Joi.string().alphanum().required(),
  amount: Joi.number().integer().required()
});
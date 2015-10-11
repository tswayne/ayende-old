'use strict';

var Joi = require('joi');

module.exports.schema = Joi.object().keys({
  id: Joi.number().integer().required(),
  xCoordinate: Joi.number().integer().required(),
  yCoordinate: Joi.number().integer().required()
});
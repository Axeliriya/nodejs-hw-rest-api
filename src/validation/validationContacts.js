const joi = require('joi');
const { HttpCode, RegularExpressions } = require('../helpers/constants');

const schemaCreateContact = joi.object({
  name: joi
    .string()
    .pattern(
      new RegExp(RegularExpressions.NAME),
      RegularExpressions.ERROR_MESSAGE_NAME,
    )
    .required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi
    .string()
    .pattern(
      new RegExp(RegularExpressions.PHONE),
      RegularExpressions.ERROR_MESSAGE_PHONE,
    )
    .required(),
  favorite: joi.boolean().optional(),
  owner: joi.object().optional(),
});

const schemaUpdateContact = joi.object({
  name: joi
    .string()
    .pattern(
      new RegExp(RegularExpressions.NAME),
      RegularExpressions.ERROR_MESSAGE_NAME,
    )
    .optional(),
  email: joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: joi
    .string()
    .pattern(
      new RegExp(RegularExpressions.PHONE),
      RegularExpressions.ERROR_MESSAGE_PHONE,
    )
    .optional(),
  favorite: joi.boolean().optional(),
  owner: joi.object().optional(),
});

const schemaUpdateStatusContact = joi.object({
  favorite: joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Failed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateCreate = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdate = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateStatus = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};

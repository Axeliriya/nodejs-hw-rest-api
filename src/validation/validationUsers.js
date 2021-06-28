const joi = require('joi');
const { HttpCode, RegularExpressions } = require('../helpers/constants');

const schemaCreateUser = joi.object({
  name: joi
    .string()
    .pattern(
      new RegExp(RegularExpressions.NAME),
      RegularExpressions.ERROR_MESSAGE_NAME,
    )
    .optional(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .pattern(new RegExp(RegularExpressions.PASSWORD))
    .required(),
  subscription: joi.string().optional(),
  token: joi.object().optional(),
});

const schemaUpdateUserSubscr = joi.object({
  subscription: joi.string().required(),
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
  return validate(schemaCreateUser, req.body, next);
};

module.exports.validateUpdate = (req, res, next) => {
  return validate(schemaUpdateUserSubscr, req.body, next);
};

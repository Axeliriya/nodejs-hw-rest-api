const joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const messageErrName = `'The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc.'`;

const regPhoneNumber =
  /^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/;
const messageErrPhoneNumber = `'Phone number must be 11-12 digits long and can contain numbers, spaces, dashes, pot-bellied brackets and can start with +'`;

const schemaCreateContact = joi.object({
  name: joi.string().pattern(new RegExp(regName), messageErrName).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: joi
    .string()
    .pattern(new RegExp(regPhoneNumber), messageErrPhoneNumber)
    .required(),
});

const schemaUpdateContact = joi.object({
  name: joi.string().pattern(new RegExp(regName), messageErrName).optional(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: joi
    .string()
    .pattern(new RegExp(regPhoneNumber), messageErrPhoneNumber)
    .optional(),
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

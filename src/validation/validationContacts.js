import joi from 'joi';
import { HttpCode } from '../helpers/constants.js';

const regPhoneNumber =
  /^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/;
const messageErrPhoneNumber = `'Phone number must be 11-12 digits long and can contain numbers, spaces, dashes, pot-bellied brackets and can start with +'`;

const schemaCreateContact = joi.object({
  name: joi.string().alphanum().min(2).max(30).required(),
  number: joi
    .string()
    .pattern(new RegExp(regPhoneNumber), messageErrPhoneNumber)
    .required(),
});

const schemaUpdateContact = joi.object({
  name: joi.string().alphanum().min(2).max(30).optional(),
  number: joi.string().pattern(new RegExp(regPhoneNumber)).optional(),
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

export const validateCreate = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

export const validateUpdate = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

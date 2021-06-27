const joi = require('joi');
const { HttpCode, RegularExpressions } = require('../helpers/constants');
// password
// subscription
// token

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
  subscription: joi.boolean().optional(),
  token: joi.object().optional(),
});

// const schemaUpdateContact = joi.object({
//   name: joi
//     .string()
//     .pattern(
//       new RegExp(RegularExpressions.NAME),
//       RegularExpressions.ERROR_MESSAGE_NAME,
//     )
//     .optional(),
//   email: joi
//     .string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//     .optional(),
//   phone: joi
//     .string()
//     .pattern(
//       new RegExp(RegularExpressions.PHONE),
//       RegularExpressions.ERROR_MESSAGE_PHONE,
//     )
//     .optional(),
//   favorite: joi.boolean().optional(),
//   user: joi.object().optional(),
// });

// const schemaUpdateStatusContact = joi.object({
//   favorite: joi.boolean().required(),
// });

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

// module.exports.validateUpdate = (req, res, next) => {
//   return validate(schemaUpdateContact, req.body, next);
// };

// module.exports.validateUpdateStatus = (req, res, next) => {
//   return validate(schemaUpdateStatusContact, req.body, next);
// };

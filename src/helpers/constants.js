const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const RegularExpressions = {
  NAME: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  ERROR_MESSAGE_NAME: `'The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc.'`,
  PHONE:
    /^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/,
  ERROR_MESSAGE_PHONE: `'Phone number must be 11-12 digits long and can contain numbers, spaces, dashes, pot-bellied brackets and can start with +'`,
  PASSWORD: /^[a-zA-Z0-9]{3,30}$/,
};

const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
};

const SALT_FACTOR = 8;

module.exports = {
  HttpCode,
  RegularExpressions,
  Subscription,
  SALT_FACTOR,
};

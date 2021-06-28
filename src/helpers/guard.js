const passport = require('passport');
const { HttpCode } = require('./constants');
require('../config/passport');

const guard = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return next({
        status: HttpCode.FORBIDDEN,
        message: 'Forbidden',
        data: 'Forbidden',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

// const userGuard = async (req, res, next) => {
//   await passport.authenticate('local', { session: false }, (error, user) => {
//     if (error || !user) {
//       return next({
//         status: HttpCode.UNAUTHORIZED,
//         message: `Not authorized`,
//         data: 'Unauthorized',
//       });
//     }
//     req.user = user;
//     return next();
//   })(req, res, next);
// };

module.exports = guard;

const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message:
        'Your IP has reached the limit for creating accounts in 1 hour. Try again later.',
    });
  },
});

module.exports = {
  createAccountLimiter,
};

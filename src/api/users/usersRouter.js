const { Router } = require('express');

const {
  getUser,
  getVerify,
  getReVerification,
  registration,
  login,
  logout,
  updateSubscriptionById,
  updateAvatar,
} = require('../../controllers/usersController');
const {
  validateCreate,
  validateUpdate,
} = require('../../validation/validationUsers');
const guard = require('../../helpers/guard');
const userGuard = require('../../helpers/userGuard');
const { createAccountLimiter } = require('../../helpers/rate-limit');
const { upload } = require('../../helpers/multer');

const routerUsers = Router();

routerUsers
  .patch('/', userGuard, validateUpdate, updateSubscriptionById)
  .get('/current', userGuard, getUser)
  .get('/verify/:verificationToken', getVerify)
  .post('/verify', getReVerification)
  .post('/signup', createAccountLimiter, validateCreate, registration)
  .post('/login', validateCreate, login)
  .post('/logout', guard, logout)
  .patch('/avatars', userGuard, upload.single('avatar'), updateAvatar);

module.exports = { routerUsers };

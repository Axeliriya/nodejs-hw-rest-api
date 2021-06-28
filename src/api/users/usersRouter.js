const { Router } = require('express');
const {
  getUser,
  registration,
  login,
  logout,
} = require('../../controllers/usersController');
const { validateCreate } = require('../../validation/validationUsers');
const guard = require('../../helpers/guard');
const userGuard = require('../../helpers/userGuard');
const { createAccountLimiter } = require('../../helpers/rate-limit');

const routerUsers = Router();

routerUsers
  .get('/current', userGuard, getUser)
  .post('/signup', createAccountLimiter, validateCreate, registration)
  .post('/login', validateCreate, login)
  .post('/logout', guard, logout);

module.exports = { routerUsers };

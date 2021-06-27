const { Router } = require('express');
const {
  registration,
  login,
  logout,
} = require('../../controllers/usersController');
const { validateCreate } = require('../../validation/validationUsers');
const guard = require('../../helpers/guard');

const routerUsers = Router();

routerUsers
  .post('/signup', validateCreate, registration)
  .post('/login', validateCreate, login)
  .post('/logout', guard, logout);

module.exports = { routerUsers };

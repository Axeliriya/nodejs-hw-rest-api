const { Router } = require('express');
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contactsController');
const {
  validateCreate,
  validateUpdate,
} = require('../../validation/validationContacts');

const router = Router();

router
  .get('/', listContacts)
  .get('/:contactId', getById)
  .post('/', validateCreate, addContact)
  .delete('/:contactId', removeContact)
  .put('/:contactId', validateUpdate, updateContact);

module.exports = { router };

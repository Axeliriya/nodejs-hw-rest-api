const { Router } = require('express');
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsController');
const {
  validateCreate,
  validateUpdate,
  validateUpdateStatus,
} = require('../../validation/validationContacts');
const guard = require('../../helpers/guard');

const router = Router();

router
  .get('/', guard, listContacts)
  .get('/:contactId', guard, getById)
  .post('/', guard, validateCreate, addContact)
  .delete('/:contactId', guard, removeContact)
  .put('/:contactId', guard, validateUpdate, updateContact)
  .patch('/:contactId', guard, validateUpdateStatus, updateStatusContact);

module.exports = { router };

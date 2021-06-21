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

const router = Router();

router
  .get('/', listContacts)
  .get('/:contactId', getById)
  .post('/', validateCreate, addContact)
  .delete('/:contactId', removeContact)
  .put('/:contactId', validateUpdate, updateContact)
  .patch('/:contactId', validateUpdateStatus, updateStatusContact);

module.exports = { router };

import { Router } from 'express';
import {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} from '../../controllers/contacts.js';
import {
  validateCreate,
  validateUpdate,
} from '../../../validation/validationContacts.js';

export const router = Router();

router
  .get('/', listContacts)
  .get('/:contactId', getById)
  .post('/', validateCreate, addContact)
  .delete('/:contactId', removeContact)
  .put('/:contactId', validateUpdate, updateContact);

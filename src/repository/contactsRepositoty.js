import { v4 as uuid } from 'uuid';
import db from '../db/contacts.js';

class ContactsRepository {
  listContacts() {
    return db.data.contacts;
  }

  getById(contactId) {
    const record = db.data.contacts.find(
      ({ id }) => String(id) === String(contactId),
    );
    return record;
  }

  addContact(body) {
    const id = uuid();
    const record = {
      id,
      ...body,
    };
    db.data.contacts.push(record);
    db.write();
    return record;
  }

  removeContact(contactId) {
    const record = db.data.contacts.filter(
      ({ id }) => String(id) !== String(contactId),
    );

    db.data.contacts = record;

    db.write();

    return record;
  }

  updateContact(contactId, body) {
    const record = db.data.contacts.map(contact =>
      String(contact.id) === String(contactId)
        ? { ...contact, ...body }
        : { ...contact },
    );

    db.data.contacts = record;

    db.write();
    return record;
  }
}

export default ContactsRepository;

import ContactsRepositoty from '../repository/contactsRepositoty.js';

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepositoty(),
    };
  }

  listContacts() {
    const data = this.repositories.contacts.listContacts();
    return data;
  }

  getById({ contactId }) {
    const data = this.repositories.contacts.getById(contactId);
    return data;
  }

  addContact(body) {
    const data = this.repositories.contacts.addContact(body);
    return data;
  }

  removeContact({ contactId }) {
    const data = this.repositories.contacts.removeContact(contactId);
    return data;
  }

  updateContact({ contactId }, body) {
    const data = this.repositories.contacts.updateContact(contactId, body);
    return data;
  }
}

export default ContactsService;

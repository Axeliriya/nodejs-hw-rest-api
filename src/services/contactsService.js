const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async listContacts(id, query) {
    const data = await this.repositories.contacts.listContacts(id, query);
    const { docs: contacts, totalDocs: total, limit, offset } = data;
    return { contacts, total, limit: Number(limit), offset: Number(offset) };
  }

  async getById(id, contactId) {
    const data = await this.repositories.contacts.getById(id, contactId);
    return data;
  }

  async addContact(id, body) {
    const data = await this.repositories.contacts.addContact(id, body);
    return data;
  }

  async removeContact(id, contactId) {
    const data = await this.repositories.contacts.removeContact(id, contactId);
    return data;
  }

  async updateContact(id, contactId, body) {
    const data = await this.repositories.contacts.updateContact(
      id,
      contactId,
      body,
    );
    return data;
  }
}

module.exports = ContactsService;

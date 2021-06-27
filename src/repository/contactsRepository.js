const Contact = require('../schemas/contactsSchema');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts({ limit = 5, offset = 0 }) {
    const data = await this.model.paginate({}, { limit, offset });
    return data;
  }

  async getById({ contactId }) {
    const contact = await this.model.findOne({ _id: contactId });
    return contact;
  }

  async addContact(id, body) {
    const contact = await this.model.create({ ...body, owner: id });
    return contact;
  }

  async removeContact({ contactId }) {
    const contact = await this.model.findByIdAndRemove({
      _id: contactId,
    });
    return contact;
  }

  async updateContact({ contactId }, body) {
    const contact = await this.model.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true },
    );
    return contact;
  }
}

module.exports = ContactsRepository;

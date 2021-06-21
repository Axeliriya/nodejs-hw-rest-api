const Contact = require('../schemas/contactsSchema');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts() {
    const data = await this.model.find({});
    return data;
  }

  async getById({ contactId }) {
    const contact = await this.model.findOne({ _id: contactId });
    return contact;
  }

  async addContact(body) {
    const contact = await this.model.create(body);
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

const Contact = require('../schemas/contactsSchema');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts(
    id,
    { limit = 5, offset = 0, sortBy, sortByDesc, filter },
  ) {
    const data = await this.model.paginate(
      { owner: id },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'name email subscription',
        },
      },
    );
    return data;
  }

  async getById(id, { contactId }) {
    const contact = await this.model
      .findOne({ _id: contactId, owner: id })
      .populate({
        path: 'owner',
        select: 'name email subscription',
      });
    return contact;
  }

  async addContact(id, body) {
    const contact = await this.model.create({ ...body, owner: id });
    return contact;
  }

  async removeContact(id, { contactId }) {
    const contact = await this.model.findByIdAndRemove({
      _id: contactId,
      owner: id,
    });
    return contact;
  }

  async updateContact(id, { contactId }, body) {
    const contact = await this.model.findByIdAndUpdate(
      { _id: contactId, owner: id },
      { ...body },
      { new: true },
    );
    return contact;
  }
}

module.exports = ContactsRepository;

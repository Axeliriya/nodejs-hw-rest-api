const { v4: uuid } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const file = path.join(__dirname, '..', '..', 'data', 'db.json');

async function readDB(filename) {
  try {
    const data = await fs.readFile(filename);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function writeDB(filename, data) {
  try {
    const contacts = await fs.writeFile(filename, JSON.stringify(data));
    return contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

class ContactsService {
  async listContacts() {
    try {
      const data = await readDB(file);

      await writeDB(file, data);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getById({ contactId }) {
    try {
      const data = await readDB(file);

      const contact = data.find(({ id }) => String(id) === contactId);

      await writeDB(file, data);

      return contact;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addContact(body) {
    const contact = {
      id: uuid(),
      ...body,
    };

    try {
      const data = await readDB(file);

      data.push(contact);

      await writeDB(file, data);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeContact({ contactId }) {
    try {
      let data = await readDB(file);

      const contact = data.find(({ id }) => String(id) === contactId);

      const contactsFiltered = data.filter(
        ({ id }) => String(id) !== String(contactId),
      );

      data = contactsFiltered;

      await writeDB(file, data);

      return { data, contact };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateContact({ contactId }, body) {
    try {
      const data = await readDB(file);

      const index = data.findIndex(
        ({ id }) => String(id) === String(contactId),
      );

      data[index] = {
        ...data[index],
        ...body,
      };

      const contactUpdated = data[index];

      await writeDB(file, data);

      return contactUpdated;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = ContactsService;

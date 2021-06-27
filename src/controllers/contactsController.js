const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts(req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        contacts: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const id = req.user.id;
    const contact = await contactsService.addContact(id, req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      contacts: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Contact deleted',
        contacts: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length > 0) {
      const contact = await contactsService.updateContact(req.params, req.body);
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          contacts: {
            contact,
          },
        });
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: 'Not found contact',
          data: 'Not Found',
        });
      }
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field',
        data: 'Bad Request',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length > 0) {
      const contact = await contactsService.updateContact(req.params, req.body);
      if (contact) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          contacts: {
            contact,
          },
        });
      } else {
        return next({
          status: HttpCode.NOT_FOUND,
          message: 'Not found contact',
          data: 'Not Found',
        });
      }
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field',
        data: 'Bad Request',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

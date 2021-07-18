const { UsersRepository } = require('../repository');
const { Subscription } = require('../helpers/constants');
const EmailService = require('./emailService');
const { v4: uuid } = require('uuid');

const { STARTER, PRO, BUSINESS } = Subscription;

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
    this.emailService = new EmailService();
  }

  async createUser(email, password, name) {
    const verifyToken = uuid();
    try {
      await this.emailService.sendEmail(verifyToken, email, name);
    } catch (error) {
      console.error(error);
      throw error;
    }
    const user = await this.repositories.users.createUser(
      name,
      email,
      password,
      verifyToken,
    );
    return user;
  }

  async getCurrentUser(id) {
    const user = await this.repositories.users.getCurrentUser(id);
    return user;
  }

  async getVerify({ verificationToken }) {
    const user = await this.repositories.users.findByField({
      verifyToken: verificationToken,
    });
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null });
      return true;
    }
    return false;
  }

  async getReVerification({ verifyToken, email, name }) {
    const user = await this.repositories.users.findByEmail(email);
    if (user.verify) {
      return false;
    }
    await this.emailService.sendEmail(verifyToken, email, name);
    return true;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async updateSubscr(userId, body) {
    if (
      body.subscription === STARTER ||
      body.subscription === PRO ||
      body.subscription === BUSINESS
    ) {
      const user = await this.repositories.users.updateSubscr(userId, body);
      return user;
    }
  }

  async updateAvatar(userId, pathFile) {
    const avatarURL = await this.repositories.users.updateAvatar(
      userId,
      pathFile,
    );
    return avatarURL;
  }
}

module.exports = UsersService;

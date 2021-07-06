const { UsersRepository } = require('../repository');
const { Subscription } = require('../helpers/constants');

const { STARTER, PRO, BUSINESS } = Subscription;

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async createUser(email, password) {
    const user = await this.repositories.users.createUser(email, password);
    return user;
  }

  async getCurrentUser(id) {
    const user = await this.repositories.users.getCurrentUser(id);
    return user;
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

const { UsersRepository } = require('../repository');

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

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async updateSubscr(userId, body) {
    console.log(userId, body);
    const user = await this.repositories.users.updateSubscr(userId, body);
    return user;
  }
}

module.exports = UsersService;

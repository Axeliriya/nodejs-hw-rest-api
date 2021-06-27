const { UsersRepository } = require('../repository');

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async createUser(body) {
    const user = await this.repositories.users.createUser(body);
    return user;
  }

  async findByEmail({ email }) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }
}

module.exports = UsersService;

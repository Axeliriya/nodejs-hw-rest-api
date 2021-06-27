const User = require('../schemas/usersSchema');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async createUser(body) {
    const user = await this.model(body);
    return user.save();
  }

  async findById(id) {
    const user = await this.model.findOne({ _id: id });
    return user;
  }

  async findByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async updateToken(id, token) {
    return await this.model.updateOne({ _id: id, token });
  }
}

module.exports = UsersRepository;

const User = require('../schemas/usersSchema');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async createUser(email, password) {
    const Model = this.model;
    const user = await new Model({ email, password });
    return await user.save();
  }

  async getCurrentUser(id) {
    const user = await this.model.findOne(
      { _id: id },
      '_id name email subscription avatarURL',
    );
    return user;
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
    return await this.model.updateOne({ _id: id }, { token });
  }

  async updateSubscr(userId, body) {
    const { name, email, subscription } = await this.model.findByIdAndUpdate(
      { _id: userId },
      { ...body },
      { new: true },
    );
    return { name, email, subscription };
  }

  async updateAvatar(userId, pathFile) {
    const { avatarURL } = await this.model.findByIdAndUpdate(
      { _id: userId },
      { avatarURL: pathFile },
      { new: true },
    );
    return avatarURL;
  }
}

module.exports = UsersRepository;

const User = require('../schemas/usersSchema');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async createUser(name, email, password, verifyToken) {
    const Model = this.model;
    const user = await new Model({ name, email, password, verifyToken });
    return await user.save();
  }

  async getCurrentUser(id) {
    const user = await this.model.findOne(
      { _id: id },
      '_id name email subscription avatarURL',
    );
    return user;
  }

  async getVerify(token) {
    const result = await this.model.getVerify(token);
    return result;
  }

  async findById(id) {
    const user = await this.model.findOne({ _id: id });
    return user;
  }

  async findByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async findByField(field) {
    const user = await this.model.findOne(field);
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

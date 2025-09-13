const userModel = require("../models/user-model")

class UserService {
  async getUsers() {
    const users = await userModel.find()
    return users
  }
}

module.exports = new UserService()
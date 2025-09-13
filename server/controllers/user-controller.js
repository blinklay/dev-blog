const userService = require("../services/user-service")

class UserController {
  async getUsers(req, res) {
    const users = await userService.getUsers()
    return res.status(200).json({ users })
  }
}

module.exports = new UserController()
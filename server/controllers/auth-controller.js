const { validationResult } = require("express-validator/lib");
const authService = require("../services/auth-service");
const createHttpError = require("http-errors");

class AuthController {
  async register(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationErrorMessage = errors.array()[0].msg;
      throw createHttpError(400, validationErrorMessage)
    }
    const { username, email, password } = req.body;
    const userData = await authService.register(username, email, password)
    res.cookie("refreshToken", userData.refreshToken)
    return res.status(200).json(userData)
  }

  async login(req, res) {
    const { username, email, password } = req.body;
    const userData = await authService.login(username, email, password)
    res.cookie("refreshToken", userData.refreshToken)
    return res.status(200).json(userData)
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    const token = await authService.logout(refreshToken)
    res.clearCookie("refreshToken")
    return res.status(200).json(token)
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    const userData = await authService.refresh(refreshToken)
    res.cookie("refreshToken", userData.refreshToken)
    res.status(200).json(userData)
  }
}

module.exports = new AuthController()
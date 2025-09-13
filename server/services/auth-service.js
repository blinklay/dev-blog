const createHttpError = require("http-errors");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const UesrDto = require("../Dtos/user-dto");
const tokenService = require("./token-service");

class AuthService {
  async userIssue(user) {
    const userDto = new UesrDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: { ...userDto }
    }
  }

  async register(username, email, password) {
    const candidate = await userModel.findOne({
      $or: [{ email }, { username }]
    })

    if (candidate) {
      throw createHttpError(400, "Такой пользователь уже существует!")
    }

    const hashPassword = await bcrypt.hash(password, 7)
    const user = await userModel.create({ username, email, password: hashPassword })

    return this.userIssue(user)
  }

  async login(username, email, password) {
    const user = await userModel.findOne({
      $or: [{ email }, { username }]
    })
    if (!user) {
      throw createHttpError(404, "Пользователь не найден!")
    }

    const isPasEquals = await bcrypt.compare(password, user.password)
    if (!isPasEquals) {
      throw createHttpError(400, "Неаерный пароль!")
    }

    return this.userIssue(user)
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw createHttpError(401, "Пользователь не авторизирован!")
    }

    const userData = tokenService.verifyRefreshToken(refreshToken)
    const token = await tokenService.findToken(refreshToken)

    if (!userData || !token) {
      throw createHttpError(401, "Пользователь не авторизирован!")
    }
    const user = await userModel.findById(userData.id)

    return this.userIssue(user)
  }
}

module.exports = new AuthService()
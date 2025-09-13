const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "30m" })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "30d" })
    return { accessToken, refreshToken }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken })
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  verifyAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
      return userData
    } catch (error) {
      return null
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)
      return userData
    } catch (error) {
      return null
    }
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }
}

module.exports = new TokenService()
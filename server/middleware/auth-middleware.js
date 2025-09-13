const createHttpError = require("http-errors");
const tokenService = require("../services/token-service");

module.exports = function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(createHttpError(401, "Пользователь не авторизирован!"))
    }

    const accessToken = authorizationHeader.split(" ")[1]
    if (!accessToken) {
      return next(createHttpError(401, "Пользователь не авторизирован!"))
    }

    const userData = tokenService.verifyAccessToken(accessToken)
    if (!userData) {
      return next(createHttpError(401, "Пользователь не авторизирован!"))
    }

    req.user = userData;
    next()
  } catch (err) {
    return next(createHttpError(401, "Пользователь не авторизирован!"))
  }
}
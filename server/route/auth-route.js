const { Router } = require("express")
const authRoute = new Router()
const asyncHandler = require("express-async-handler");
const authController = require("../controllers/auth-controller");
const { body } = require("express-validator/lib");

authRoute.post("/register", [
  body("username").isLength({ min: 3, max: 22 }).withMessage("Длинна поля от 3-х до 22-х символов!"),
  body("email").isEmail().withMessage("Формат почты не валидный!"),
  body("password").isLength({ min: 3, max: 20 }).withMessage("Длинна поля от 3-х до 20-ти символов!")
], asyncHandler(authController.register))
authRoute.post("/login", asyncHandler(authController.login))
authRoute.post("/logout", asyncHandler(authController.logout))
authRoute.get("/refresh", asyncHandler(authController.refresh))

module.exports = authRoute;
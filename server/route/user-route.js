const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middleware/auth-middleware");
const userRoute = new Router()

userRoute.get("/all", authMiddleware, asyncHandler(userController.getUsers))

module.exports = userRoute;
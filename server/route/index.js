const { Router } = require("express");
const authRoute = require("./auth-route");
const userRoute = require("./user-route");
const router = new Router()

router.use("/auth", authRoute)
router.use("/user", userRoute)

module.exports = router;
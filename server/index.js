require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const errorNiddleware = require("./middleware/error-niddleware")
const router = require("./route")

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)

app.use(errorNiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected!");

    app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

start()
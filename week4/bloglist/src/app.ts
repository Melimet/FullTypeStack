import express from "express"
import cors from "cors"
import { blogRouter } from "./routes/blog"
import { MONGODB_URI } from "./utils/config"
import mongoose from "mongoose"
require('express-async-errors')
const app = express()
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Db connection succesful")
  })
  .catch((err) => {
    console.log("mongo err: ", err)
  })


app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

export {app}
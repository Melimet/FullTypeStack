import express from "express"
import blogRouter from "./controllers/blogs"
import userRouter from "./controllers/users"

require('express-async-errors')
const app = express()

app.use(express.json())

app.use("/api/blogs/", blogRouter) 

app.use("/api/users/", userRouter)

app.get("/", (_req, res) => {
  res.send("Hello World!")
})


export { app }

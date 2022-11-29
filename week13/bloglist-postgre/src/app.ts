import express from "express"
import blogRouter from "./controllers/blogs"

require('express-async-errors')
const app = express()

app.use(express.json())


app.use("/api/blogs/", blogRouter) 

app.get("/", (_req, res) => {
  res.send("Hello World!")
})

export { app }

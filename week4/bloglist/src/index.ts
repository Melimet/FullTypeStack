import express from "express"
const app = express()
import cors from "cors"
import { blogRouter } from "./routes/blog"
import { PORT } from "./utils/config"


app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

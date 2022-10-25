import mongoose from "mongoose"
import { MONGODB_URI } from "../utils/config"

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

const mongoUrl = MONGODB_URI
if (!mongoUrl) {
  console.log("no url for mongo, critical failure")
  process.exit()
}
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Db connection succesful")
  }).catch(err => {
    console.log("mongo err: ", err)
  })

export { Blog }
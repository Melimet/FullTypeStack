import express from "express"
import { Blog } from "../models/blog"
import { validateBlog } from "../utils/blog_validator"

const blogRouter = express.Router()

blogRouter.get("/", (_request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post("/", async (request, response) => {
  const blogValidate = validateBlog(request.body)
  if (!blogValidate) return response.status(400).end()

  const blog = new Blog(blogValidate)

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

export { blogRouter }

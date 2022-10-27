import express from "express"
import { Blog } from "../models/blog"
import { BlogType } from "../types"
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

blogRouter.delete("/:id", async (request, response) => {
  const idToBeDeleted: string | undefined = request.params.id
  if (!idToBeDeleted) return response.status(400).end()

  const result: BlogType | undefined | null = await Blog.findByIdAndDelete(
    idToBeDeleted
  )
  if (!result) return response.status(404).end()

  return response.status(200).json(result)
})

blogRouter.put("/:id", async (request, response) => {
  const blogToBeUpdated: BlogType | undefined = request.body
  const idToBeUpdated: string | undefined = request.params.id
  if (!idToBeUpdated || !blogToBeUpdated) return response.status(400).end()

  const result = await Blog.findByIdAndUpdate(idToBeUpdated, blogToBeUpdated, {new:true})

  if (!result) return response.status(404).end()

  return response.status(200).json(result)
})

export { blogRouter }

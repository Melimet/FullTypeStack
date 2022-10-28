import express, {Request} from "express"
import { Blog } from "../models/blog"
import { User } from "../models/user"
import { BlogType } from "../types"
import { validateBlog } from "../utils/blog_validator"
import jwt from "jsonwebtoken"
import { CustomRequest, userExtractor } from "../utils/tokenProcessing"

const blogRouter = express.Router()

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user")
  return response.json(blogs)
})

blogRouter.post("/", userExtractor, async (request, response) => {
  const blogValidate = validateBlog(request.body)
  if (!blogValidate) return response.status(400).end()



  const user = await User.findById((request as CustomRequest).user)

  if (!user) return response.status(400).json({ error: "User not found." })

  const blog = new Blog({ ...blogValidate, user: (request as CustomRequest).user })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()
  return response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", userExtractor, async (request: Request, response) => {
  const idToBeDeleted: string | undefined = request.params.id
  if (!idToBeDeleted) return response.status(400).end()

  const blog = await Blog.findById(idToBeDeleted)
  
  if (!blog) return response.status(400).end()

  if (blog.user.toString() !== (request as CustomRequest).user)
    return response.status(401).json({ error: "Unauthorized" })  

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

  const result = await Blog.findByIdAndUpdate(idToBeUpdated, blogToBeUpdated, {
    new: true,
  })

  if (!result) return response.status(404).end()

  return response.status(200).json(result)
})

export { blogRouter }

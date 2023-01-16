import express from "express"
import { Blog, User } from "../models"
import { CustomRequest } from "../types"
import tokenExtractor from "../util/tokenExtractor"

const blogRouter = express.Router()

declare global {
  namespace Express {
    export interface Request {
      blog: Blog | null
    }
  }
}

async function blogFinder(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  req.blog = await Blog.findByPk(req.params.id)
  return next()
}

blogRouter.get("/", async (_req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs)
  return res.json(blogs)
})

blogRouter.post("/", tokenExtractor, async (req, res) => {
  const blog = req.body

  if (!(req as CustomRequest).decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findByPk((req as CustomRequest).decodedToken.id)

  if (!user) {
    return res.status(401).json({ error: "Unable to find user with token" })
  }

  const newBlog = await Blog.create({...blog, userId: user.id})
  return res.json(newBlog)
})

blogRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  return res.status(204).end()
})

blogRouter.put("/:id", blogFinder, async (req, res) => {
  const blog = req.body
  if (req.blog) {
    const updatedBlog = await req.blog.update(blog)
    return res.status(204).send(updatedBlog)
  }
  return res.status(404).end()
})

export default blogRouter

import express from 'express'
import { Blog } from '../models'

const blogRouter = express.Router()

async function blogFinder(req: express.Request, res: express.Response, next: express.NextFunction) {
  req.blog = await Blog.findByPk(req.params.id)
  return next()
}

blogRouter.get("/", async (_req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs)
  return res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
  const blog = req.body
  const newBlog = await Blog.create(blog)
  return res.json(newBlog)
})

blogRouter.delete("/:id", blogFinder,async (req, res) => {

  if (req.blog) {
    await req.blog.destroy()
  }
  return res.status(204).end()
})

export default blogRouter
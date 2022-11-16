import { Blog } from '../../models/blog'

async function blogsInDb() {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

export { blogsInDb }

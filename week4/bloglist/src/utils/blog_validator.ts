import { BlogType } from "../types"

function validateBlog(maybeBlog: BlogType): BlogType | undefined {
  if (!maybeBlog.title || !maybeBlog.url) return undefined

  const blog: BlogType = {
    title: maybeBlog.title,
    url: maybeBlog.url,
    likes: maybeBlog.likes || 0,
    author: maybeBlog.author || "",
  }
  return blog
}

export { validateBlog }

import { BlogType } from "../types"

function validateBlog(maybeBlog: BlogType): BlogType | undefined {
  if (!maybeBlog.title || !maybeBlog.url) return undefined
  return maybeBlog
}

export { validateBlog }

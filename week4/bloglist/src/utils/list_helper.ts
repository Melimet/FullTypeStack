import { BlogType } from "../types"

const dummy = (blogs: BlogType[]) => {
  console.log(blogs)
  return 1
}

function totalLikes(blogs: BlogType[]) {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

function favoriteBlog(blogs: BlogType[]) {
  if (blogs.length === 0) return undefined

  const emptyBlog: BlogType = {
    id: "",
    title: "",
    author: "",
    url: "",
    likes: -Infinity,
  }

  const result = blogs.reduce(
    (mostLikedBlog, current) =>
      current.likes >= mostLikedBlog.likes ? current : mostLikedBlog,
    emptyBlog
  )

  return result
}

function mostBlogs(blogs: BlogType[]) {
  if (blogs.length === 0) return undefined

  const [mostActiveBlogger] = Array.from(
    blogs.reduce(
      (bloggers, current) =>
        bloggers.set(
          current.author,
          bloggers.has(current.author) ? bloggers.get(current.author)! + 1 : 1
        ),
      new Map<string, number>()
    )
  ).sort((blog1, blog2) => blog2[1] - blog1[1])
  console.log(mostActiveBlogger)
  return { author: mostActiveBlogger[0], writtenBlogs: mostActiveBlogger[1] }
}

function mostLikes(blogs: BlogType[]) {
  if (blogs.length === 0) return undefined
  
  const [mostLikedBlogger] = Array.from(
    blogs.reduce((bloggers, current) => 
      bloggers.set(
        current.author,
        bloggers.has(current.author) ? bloggers.get(current.author)! + current.likes : current.likes
      ),
      new Map<string, number>()
    )).sort((blog1, blog2) => blog2[1] - blog1[1])
  
        return {author: mostLikedBlogger[0], likes: mostLikedBlogger[1]}
}

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}

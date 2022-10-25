import { Blog } from "../types"

const dummy = (blogs: Blog[]) => {
  console.log(blogs)
  return 1
}

function totalLikes(blogs: Blog[]) {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

function favoriteBlog(blogs: Blog[]) {
  if (blogs.length === 0) return undefined

  const emptyBlog: Blog = {
    _id: "",
    title: "",
    author: "",
    url: "",
    likes: -Infinity,
    __v: 0,
  }

  const result = blogs.reduce(
    (mostLikedBlog, current) =>
      current.likes >= mostLikedBlog.likes ? current : mostLikedBlog,
    emptyBlog
  )

  return result
}

function mostBlogs(blogs: Blog[]) {
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

function mostLikes(blogs: Blog[]) {
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

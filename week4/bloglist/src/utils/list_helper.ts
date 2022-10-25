import { Blog } from "../types"

const dummy = (blogs: Blog[]) => {
  console.log(blogs)
  return 1
}

function totalLikes(blogs: Blog[]) {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

function favoriteBlog(blogs: Blog[]) {
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

  if (
    Object.entries(emptyBlog).toString() === Object.entries(result).toString()
  )
    return undefined

  return result
}

export { dummy, totalLikes, favoriteBlog }

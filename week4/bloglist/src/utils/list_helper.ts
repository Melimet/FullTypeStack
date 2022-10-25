import { Blog } from "../types"

const dummy = (blogs: Blog[]) => {
  console.log(blogs)
  return 1
}

function totalLikes(blogs: Blog[]) {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

export { dummy, totalLikes }

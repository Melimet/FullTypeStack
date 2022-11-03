import axios from "axios"
import { BlogType } from "../types"
import newBlogService from "./newBlog"
const baseUrl = "http://localhost:3003/api/blogs"

async function getAll(): Promise<BlogType[]> {
  const request = await axios.get(baseUrl)
  return request.data
}

async function addLike(blog: BlogType) {
  blog.likes++

  if (typeof blog.user === "string") return undefined
  blog.user = blog.user?.id

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.data
}

async function deleteBlog(blog: BlogType) {

  const config = {
    headers: { Authorization: newBlogService.token },
  }

  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}

export default { getAll, addLike, deleteBlog }

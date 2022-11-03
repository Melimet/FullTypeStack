import axios from "axios"
import { BlogType, UserType } from "../types"
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

export default { getAll, addLike }

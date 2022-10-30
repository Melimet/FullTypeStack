import axios from "axios"
import { BlogType } from "../types"
const baseUrl = "/api/blogs"

async function getAll(): Promise<BlogType[]> {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll }

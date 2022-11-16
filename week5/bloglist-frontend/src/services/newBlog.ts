import axios from 'axios'
import { BlogType } from '../types'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = ''

function setToken(newToken: string) {
  token = `bearer ${newToken}`
}

function getToken(): string {
  return token
}

async function createBlog(
  newBlog: Omit<BlogType, 'likes' | 'id'>
): Promise<BlogType> {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config)

  return request.data
}

export default { createBlog, setToken, getToken }

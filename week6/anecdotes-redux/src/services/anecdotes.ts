import axios from "axios"
import { AnecdoteType } from "../types"

const baseUrl = "http://localhost:3001/anecdotes"

async function getAll(): Promise<AnecdoteType[]> {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
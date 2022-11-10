import axios from "axios"
import { AnecdoteType } from "../types"

const baseUrl = "http://localhost:3001/anecdotes"

async function getAll(): Promise<AnecdoteType[]> {
  const response = await axios.get(baseUrl)
  return response.data
}

async function newAnecdote(anecdote: string): Promise<AnecdoteType> {
  const obj = {
    votes: 0,
    content: anecdote
  }
  const response = await axios.post(baseUrl, obj)
  console.log(response.data)
  return response.data
}

export default { getAll, newAnecdote }
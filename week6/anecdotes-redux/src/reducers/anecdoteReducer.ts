import { createSlice } from "@reduxjs/toolkit"
import { AnecdoteType } from "../types"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = [] as AnecdoteType[]

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState, 
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      state.push(asObject(content))
    },
    addLike(state, action) {
      const id = action.payload
      const anecdote = state.find((anec) => anec.id === id)

      if (!anecdote) return state

      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

      return state.map((anec) => (anec.id !== id ? anec : updatedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addLike, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

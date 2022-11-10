import { createSlice } from "@reduxjs/toolkit"
import { AnecdoteType } from "../types"



const initialState = [] as AnecdoteType[]

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState, 
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      console.log(content)
      return state.concat(content)
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

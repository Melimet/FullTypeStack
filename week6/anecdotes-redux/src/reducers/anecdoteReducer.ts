import { createSlice, Dispatch } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { AnecdoteType } from "../types"


const initialState = [] as AnecdoteType[]

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState, 
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
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

export function initializeAnecdotes() {
  return async (dispatch: Dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export function createAnecdote(content: string) {
  return async (dispatch: Dispatch) => {
    const response = await anecdoteService.newAnecdote(content)
    dispatch(newAnecdote(response))
  }
}

export const { addLike,  setAnecdotes, newAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


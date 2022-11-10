import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, deleteNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

function AnecdoteForm() {
  const dispatch = useDispatch()

  async function addAnecdote(event: React.FormEvent) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    const content = target.text.value
    target.text.value = ""

    const res = await anecdoteService.newAnecdote(content)    
    dispatch(newAnecdote(res))
    dispatch(setNotification(`New anecdote created!`))
    setTimeout(() => {
      dispatch(deleteNotification(""))
    }, 3500)
  }

  return (
    <form onSubmit={addAnecdote}>
      <h4>new anecdote</h4>
      <input name="text" />
      <button type="submit">Add</button>
    </form>
  )
}

export default AnecdoteForm

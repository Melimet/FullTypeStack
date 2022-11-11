import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification} from "../reducers/notificationReducer"

function AnecdoteForm() {
  const dispatch = useDispatch()

  async function addAnecdote(event: React.FormEvent) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    const content = target.text.value
    target.text.value = ""

    dispatch(createAnecdote(content))
    dispatch(createNotification('New anecdote created!', 3.5))
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

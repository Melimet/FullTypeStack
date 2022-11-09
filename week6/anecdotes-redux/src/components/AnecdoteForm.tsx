import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

function AnecdoteForm() {
  const dispatch = useDispatch()

  function addAnecdote(event: React.FormEvent) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    const content = target.text.value
    target.text.value = ""
    dispatch(newAnecdote(content))
    dispatch(setNotification(`New anecdote created!`))
    
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

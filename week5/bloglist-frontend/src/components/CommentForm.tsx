import React, { useState } from 'react'
import { useAppDispatch } from '../hooks/dispatchHooks'
import { newComment } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { BlogType } from '../types'

function CommentForm({ blog }: { blog: BlogType }) {
  const [comment, setComment] = useState('')

  const dispatch = useAppDispatch()
  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault()

    await dispatch(newComment(blog, comment))
    await dispatch(
      createNotification({ message: 'Comment added!', success: true }, 3.5)
    )
    setComment('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={comment}
        type="text"
        name="comment"
        id="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default CommentForm

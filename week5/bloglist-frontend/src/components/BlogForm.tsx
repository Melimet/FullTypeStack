import React, { useState } from 'react'
import newBlog from '../services/newBlog'
import { BlogType, Notification } from '../types'

type BlogFormProps = {
  blogs: BlogType[]
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

function BlogForm({ blogs, setBlogs, setNotification }: BlogFormProps) {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    try {
      event.preventDefault()
      const result = await newBlog.createBlog({ author, title, url })

      setNotification({
        message: `Creation of ${result.title} successful`,
        success: true,
      })
      setBlogs(blogs.concat(result))
    } catch (error: unknown) {
      setNotification({
        message: `Error: ${error instanceof Error ? error.message : ''}`,
        success: false,
      })
    }
  }

  return (
    <form>
      <h3>Create a new blog</h3>
      <label htmlFor="title">
        Title{' '}
        <input
          id="title"
          type="text"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label htmlFor="author">
        Author{' '}
        <input
          id="author"
          type="text"
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label htmlFor="url">
        Url{' '}
        <input
          id="url"
          type="text"
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>

      <button id="submitBlog" type="submit" onClick={handleSubmit}>
        create
      </button>
    </form>
  )
}

export default BlogForm

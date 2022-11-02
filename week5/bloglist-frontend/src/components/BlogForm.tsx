import React, { useState } from "react"
import newBlog from "../services/newBlog"
import { BlogType, Notification } from "../types"

type BlogFormProps = {
  blogs: BlogType[]
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

function BlogForm({ blogs, setBlogs, setNotification }: BlogFormProps) {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault()
    const result = await newBlog.createBlog({ author, title, url })

    setNotification({
      message: `Creation of ${result.title} successful`,
      success: true,
    })
    setBlogs(blogs.concat(result))
  }

  return (
    <form>
      <h3>Create a new blog</h3>
      <label htmlFor="title">
        Title{" "}
        <input
          type="text"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label htmlFor="author">
        Author{" "}
        <input
          type="text"
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label htmlFor="url">
        Url{" "}
        <input
          type="text"
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>

      <button type="submit" onClick={handleSubmit}>
        create
      </button>
    </form>
  )
}

export default BlogForm

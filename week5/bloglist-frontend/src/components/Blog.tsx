import { BlogType, UserType } from '../types'
import '../index.css'
import { useState } from 'react'
import blogService from '../services/blogs'

interface BlogProps {
  blog: BlogType
  updateBlog: (blog: BlogType) => void
  removeBlog: (blog: BlogType) => void
  blogIsByLoggedUser: (blogUser: UserType) => boolean
}

function Blog({ blog, updateBlog, removeBlog, blogIsByLoggedUser }: BlogProps) {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible)
  }

  async function newLike() {
    const result = await blogService.addLike(blog)
    updateBlog(result)
    return result
  }

  async function handleDelete() {
    const result = await blogService.deleteBlog(blog)
    removeBlog(result)
    return result
  }

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      {!visible && (
        <button id="show" onClick={toggleVisibility}>
          show
        </button>
      )}
      {visible && (
        <>
          <p>By: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}{' '}
            <button id="likeButton" onClick={newLike}>
              like
            </button>
          </p>
          <button id="hide" onClick={toggleVisibility}>
            hide
          </button>
          {blog.user && blogIsByLoggedUser(blog.user as UserType) && (
            <button id="deleteButton" onClick={handleDelete}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog

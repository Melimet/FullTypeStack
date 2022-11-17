import { BlogType, UserType } from '../types'
import '../index.css'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/dispatchHooks'
import { removeBlog, updateLike } from '../reducers/blogReducer'

interface BlogProps {
  blog: BlogType
  blogIsByLoggedUser: (blogUser: UserType) => boolean
}

function Blog({ blog, blogIsByLoggedUser }: BlogProps) {
  const [visible, setVisible] = useState(false)

  const dispatch = useAppDispatch()

  function toggleVisibility() {
    setVisible(!visible)
  }

  async function newLike() {
    const res = await dispatch(updateLike(blog))
    return res
  }

  async function handleDelete() {
    
    const res = await dispatch(removeBlog(blog))

    return res
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

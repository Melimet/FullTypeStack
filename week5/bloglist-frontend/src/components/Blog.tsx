import { BlogType, UserType } from '../types'
import '../index.css'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/dispatchHooks'
import { removeBlog, updateLike } from '../reducers/blogReducer'

interface BlogProps {
  blog: BlogType | undefined
  blogIsByLoggedUser: (blogUser: UserType) => boolean
}

function Blog({ blog, blogIsByLoggedUser }: BlogProps) {



  const dispatch = useAppDispatch()



  if (!blog) return <p>404 blog not found</p>

  async function newLike() {
    if (!blog) return
    const res = await dispatch(updateLike(blog))
    return res
  }

  async function handleDelete() {
    if (!blog) return
    const res = await dispatch(removeBlog(blog))
    return res
  }

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
     
        
          <p>By: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}{' '}
            <button id="likeButton" onClick={newLike}>
              like
            </button>
          </p>
          {blog.user && blogIsByLoggedUser(blog.user as UserType) && (
            <button id="deleteButton" onClick={handleDelete}>
              delete
            </button>
          )}
        
      
    </div>
  )
}

export default Blog

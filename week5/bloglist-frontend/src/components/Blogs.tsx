import { useEffect, useState } from 'react'
import Blog from '../components/Blog'
import { BlogType, UserType } from '../types'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useAppDispatch, useAppSelector } from '../hooks/dispatchHooks'
import { initializeBlogs } from '../reducers/blogReducer'

interface BlogsProps {
  blogIsByLoggedUser: (blogUser: UserType) => boolean
}

function Blogs({ blogIsByLoggedUser }: BlogsProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useAppSelector(state => state.blogs)

  function updateBlog(blog: BlogType) {
    const newBlogs = blogs.filter((b) => b.id !== blog.id)
    setBlogs(newBlogs.concat(blog))
  }

  function removeBlog(blog: BlogType) {
    const newBlogs = blogs.filter((b) => b.id !== blog.id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
      <main className="flex-wrapper">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blogIsByLoggedUser={blogIsByLoggedUser}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              blog={blog}
            />
          ))}
      </main>
    </div>
  )
}

export default Blogs

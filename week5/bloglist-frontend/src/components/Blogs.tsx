import { useEffect, useState } from 'react'
import Blog from '../components/Blog'
import { BlogType, UserType } from '../types'
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
              blog={blog}
            />
          ))}
      </main>
    </div>
  )
}

export default Blogs

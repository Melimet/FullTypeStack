import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useAppSelector } from '../hooks/dispatchHooks'

import { Link } from 'react-router-dom'



function Blogs() {


  const blogs = useAppSelector((state) => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm />
      </Togglable>
      <main className="flex-wrapper">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link className="blog" key={blog.id} to={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>{' '}
            </Link>
          ))}
      </main>
    </div>
  )
}

export default Blogs

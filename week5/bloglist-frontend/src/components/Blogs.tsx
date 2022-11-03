import { useEffect, useState } from "react"
import Blog from "../components/Blog"
import { BlogType, UserType } from "../types"
import blogService from "../services/blogs"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { Notification } from "../types"

interface BlogsProps {
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
  blogIsByLoggedUser: (blogUser: UserType) => boolean
}

function Blogs({ setNotification, blogIsByLoggedUser }: BlogsProps) {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    fetchBlogs()
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }, [])

  function updateBlog(blog: BlogType) {
    const newBlogs = blogs.filter(b => b.id !== blog.id)
    setBlogs(newBlogs.concat(blog))
  }

  function removeBlog(blog: BlogType) {
    const newBlogs = blogs.filter(b => b.id !== blog.id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <Togglable buttonLabel="New Blog">
        <BlogForm
          setNotification={setNotification}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      <main className="flex-wrapper">
        {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <Blog key={blog.id} blogIsByLoggedUser={blogIsByLoggedUser} updateBlog={updateBlog} removeBlog={removeBlog} blog={blog} />
        ))}
      </main>
    </div>
  )
}

export default Blogs

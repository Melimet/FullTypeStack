import { useEffect, useState } from "react"
import Blog from "../components/Blog"
import { BlogType } from "../types"
import blogService from "../services/blogs"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { Notification } from "../types"

interface BlogsProps {
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

function Blogs({ setNotification }: BlogsProps) {
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
        {blogs.map((blog) => (
          <Blog key={blog.id} updateBlog={updateBlog} blog={blog} />
        ))}
      </main>
    </div>
  )
}

export default Blogs

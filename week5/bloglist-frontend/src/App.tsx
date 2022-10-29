import { useEffect, useState } from "react"
import "./App.css"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import { BlogType } from "./types"

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    fetchBlogs()
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }, [])

  return (
    <div className="App">
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App

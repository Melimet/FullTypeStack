import { useEffect, useState } from "react"
import Blog from "./components/Blog"
import LoggedIn from "./components/LoggedIn"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import { BlogType, UserType } from "./types"

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [user, setUser] = useState<UserType | undefined>()

  useEffect(() => {
    fetchBlogs()
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  if (!user) {
    return (
      <LoginForm setUser={setUser}/>
    )
  }

  return (
    <div className="App">
      <h2>blogs</h2>
      <LoggedIn user={user} setUser={setUser}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App

import { useEffect, useState } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoggedIn from "./components/LoggedIn"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import newBlog from "./services/newBlog"
import { BlogType, Notification as NotificationType, UserType } from "./types"
import "./index.css"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [user, setUser] = useState<UserType | undefined>()
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    success: false,
  })

  useEffect(() => {
    fetchBlogs()
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      newBlog.setToken(parsedUser?.token)
    }
  }, [])

  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <Togglable buttonLabel="Login">
          <LoginForm setNotification={setNotification} setUser={setUser} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <LoggedIn
        setNotification={setNotification}
        user={user}
        setUser={setUser}
      />
      <Togglable buttonLabel="New Blog">
        <BlogForm
          setNotification={setNotification}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      <main className="flex-wrapper">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </main>
    </div>
  )
}

export default App

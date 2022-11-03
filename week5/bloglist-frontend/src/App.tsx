import { useEffect, useState } from "react"

import BlogForm from "./components/BlogForm"
import LoggedIn from "./components/LoggedIn"
import LoginForm from "./components/LoginForm"
import newBlog from "./services/newBlog"
import { BlogType, Notification as NotificationType, UserType } from "./types"
import "./index.css"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Blogs from "./components/Blogs"

function App() {
  
  const [user, setUser] = useState<UserType | undefined>()
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    success: false,
  })

  useEffect(() => {


    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      newBlog.setToken(parsedUser?.token)
    }
  }, [])

  function blogIsByLoggedUser(blogUser: UserType) {
    return (blogUser.id === user?.id)
  }

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
      <Blogs blogIsByLoggedUser={blogIsByLoggedUser} setNotification={setNotification}/>
    </div>
  )
}

export default App

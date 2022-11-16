import { useEffect, useState } from 'react'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import newBlog from './services/newBlog'
import { UserType } from './types'
import './index.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'

function App() {
  const [user, setUser] = useState<UserType | undefined>()


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      newBlog.setToken(parsedUser?.token)
    }
  }, [])

  function blogIsByLoggedUser(blogUser: UserType) {
    return blogUser.id === user?.id
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel="Login">
          <LoginForm setUser={setUser} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoggedIn
        user={user}
        setUser={setUser}
      />
      <Blogs
        blogIsByLoggedUser={blogIsByLoggedUser}
      />
    </div>
  )
}

export default App

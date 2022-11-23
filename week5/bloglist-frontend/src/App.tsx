import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { UserResponseType, UserType } from './types'
import './index.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { useAppDispatch, useAppSelector } from './hooks/dispatchHooks'
import { initializeLoginState } from './reducers/loginReducer'
import Navigation from './components/Navigation'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { fetchUsers } from './services/users'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'

function App() {
  const dispatch = useAppDispatch()
  const [users, setUsers] = useState<UserResponseType[]>([])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const userInfo = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : undefined

  const blogMatch = useMatch('/blogs/:id')

  const blogs = useAppSelector((state) => state.blogs)
  const blogInfo = blogMatch
    ? [...blogs].find((blog) => blog.id === blogMatch.params.id)
    : undefined

  useEffect(() => {
    getUsers()
    async function getUsers() {
      const res = await fetchUsers()
      setUsers(res)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeLoginState())
  }, [])

  const user = useAppSelector((state) => state.user)

  function blogIsByLoggedUser(blogUser: UserType) {
    return blogUser.id === user?.id
  }

  if (!user?.username) {
    return (
      <div>
        <h2 className="title">blogs</h2>
        <Notification />
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Navigation />
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog blog={blogInfo} blogIsByLoggedUser={blogIsByLoggedUser} />
          }
        />
      </Routes>
    </div>
  )
}

export default App

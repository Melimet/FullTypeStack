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


function App() {
  const dispatch = useAppDispatch()
  const [users, setUsers] = useState<UserResponseType[]>([])

  const match = useMatch('/users/:id')
  const userInfo = match
    ? users.find((user) => user.id === match.params.id)
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
  console.log(user)

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
        <Route
          path="/"
          element={<Blogs blogIsByLoggedUser={blogIsByLoggedUser} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
      </Routes>
    </div>
  )
}

export default App

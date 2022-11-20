import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { UserType } from './types'
import './index.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { useAppDispatch, useAppSelector } from './hooks/dispatchHooks'
import { initializeLoginState } from './reducers/loginReducer'
import Navigation from './components/Navigation'
import { Route, Routes, useMatch } from "react-router-dom"

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeLoginState())
  }, [])

  const user = useAppSelector(state => state.user)
  console.log(user)

  function blogIsByLoggedUser(blogUser: UserType) {
    return blogUser.id === user?.id
  }

  if (!user?.username) {
    return (
      <div>
        <h2 className='title'>blogs</h2>
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
        <Route path="/" element={<Blogs blogIsByLoggedUser={blogIsByLoggedUser} />} />
      </Routes>
    </div>
  )
}

export default App

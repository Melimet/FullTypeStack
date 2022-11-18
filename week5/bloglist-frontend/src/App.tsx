import { useEffect } from 'react'
import LoggedIn from './components/LoggedIn'
import LoginForm from './components/LoginForm'
import { UserType } from './types'
import './index.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import { useAppDispatch, useAppSelector } from './hooks/dispatchHooks'
import { initializeLoginState } from './reducers/loginReducer'

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeLoginState())
  }, [])

  const user = useAppSelector(state => state.user)


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
      <h2 className='title'>blogs</h2>
      <Notification />
      <LoggedIn user={user} setUser={setUser} />
      <Blogs blogIsByLoggedUser={blogIsByLoggedUser} />
    </div>
  )
}

export default App

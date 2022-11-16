import newBlog from '../services/newBlog'
import { UserType } from '../types'
import { createNotification } from '../reducers/notificationReducer'
import { useAppDispatch } from "../hooks/dispatchHooks"

type LoggedInProps = {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

function LoggedIn({ user, setUser }: LoggedInProps) {
  
  const dispatch = useAppDispatch()

  function handleLogout() {
    window.localStorage.removeItem('loggedUser')
    setUser(undefined)
    dispatch(createNotification({
      message: 'logged out',
      success: true,
    }, 3.5))
    newBlog.setToken('')
  }

  return (
    <p>
      Logged in as {user.username}
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </p>
  )
}

export default LoggedIn

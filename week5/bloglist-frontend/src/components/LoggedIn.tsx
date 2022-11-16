import newBlog from '../services/newBlog'
import { UserType, Notification } from '../types'

type LoggedInProps = {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}

function LoggedIn({ user, setUser, setNotification }: LoggedInProps) {
  function handleLogout() {
    window.localStorage.removeItem('loggedUser')
    setUser(undefined)
    setNotification({
      message: 'logged out',
      success: true,
    })
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

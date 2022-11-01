import newBlog from "../services/newBlog"
import { UserType } from "../types"

type LoggedInProps = {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

function LoggedIn({user, setUser}: LoggedInProps) {

  function handleLogout() {
    window.localStorage.removeItem("loggedUser")
    setUser(undefined)
    newBlog.setToken("")
  }

  return <p>Logged in as {user.username}
    <button type="button" onClick={handleLogout}>Log out</button>
  </p>
}

export default LoggedIn

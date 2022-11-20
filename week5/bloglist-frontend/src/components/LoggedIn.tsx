import { createNotification } from '../reducers/notificationReducer'
import { useAppDispatch, useAppSelector } from '../hooks/dispatchHooks'
import { logOutUser } from '../reducers/loginReducer'

function LoggedIn() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  function handleLogout() {
    dispatch(logOutUser())

    dispatch(
      createNotification(
        {
          message: 'logged out',
          success: true,
        },
        3.5
      )
    )
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

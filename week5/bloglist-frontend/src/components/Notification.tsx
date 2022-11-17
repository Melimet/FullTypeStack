import '../index.css'
import { useAppSelector } from "../hooks/dispatchHooks"

function Notification() {

  const notification = useAppSelector((state) => state.notifications)

  if (!notification?.message || notification.message === null || notification.message === '') return <></>

  return (
    <div className={notification.success ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

export default Notification
import '../index.css'
import { useSelector } from 'react-redux'
import { StateType } from '../types'


function Notification() {

  const notification = useSelector((state: StateType) => state.notifications)

  if (!notification?.message || notification.message === null || notification.message === '') return <></>

  return (
    <div className={notification.success ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

export default Notification

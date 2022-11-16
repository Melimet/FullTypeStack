import { Notification as NotificationType } from '../types'
import '../index.css'

interface NotificationProps {
  notification: NotificationType
}

function Notification({ notification }: NotificationProps) {
  if (notification.message === null || notification.message === '') return <></>

  return (
    <div className={notification.success ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

export default Notification

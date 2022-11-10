import { useSelector } from "react-redux"
import { StateType } from "../types"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector((state: StateType) => state.notifications)
  if (!notification) return <></>

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
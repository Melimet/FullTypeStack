import { Message } from "../App"


const Notification = ({ message, goodNews }: Message) => {
  if (message === null || message == "") {
    return null
  }
  if (!goodNews) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

export { Notification }
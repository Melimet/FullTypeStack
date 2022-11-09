import { addLike } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { deleteNotification, setNotification } from "../reducers/notificationReducer"

interface AnecdoteProps {
  content: string
  votes: number
  id: string
}

function Anecdote({ content, votes, id }: AnecdoteProps) {
  const dispatch = useDispatch()

  function handleLike(id: string) {
    return () => (
      dispatch(addLike(id)),
      dispatch(setNotification(`Added like to "${content}"`)),
      setTimeout(
        () => {
          dispatch(deleteNotification(""))
        }, 3500
      )
    )
  }

  return (
    <p>
      {content}, votes: {votes} <button onClick={handleLike(id)}>like</button>
    </p>
  )
}

export default Anecdote

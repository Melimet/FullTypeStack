import { addLike } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

interface AnecdoteProps {
  content: string
  votes: number
  id: string
}

function Anecdote({ content, votes, id }: AnecdoteProps) {

  const dispatch = useDispatch()
  
  function handleLike(id: string) {
    
    return () => dispatch(addLike(id))
  }

  return (
    <p>
      {content}, votes: {votes} <button onClick={handleLike(id)}>like</button>
    </p>
  )
}

export default Anecdote

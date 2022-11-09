import { useSelector, useDispatch } from "react-redux"
import { AnecdoteType } from "../types"
import Anecdote from "./Anecdote"
function AnecdoteList() {
  const anecdotes = useSelector((state: AnecdoteType[]) => state)

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          id={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
        />
      ))}
    </div>
  )
}

export default AnecdoteList

import { useSelector } from "react-redux"
import { StateType } from "../types"
import Anecdote from "./Anecdote"

function AnecdoteList() {
  const filter = useSelector((state: StateType) => state.filter.toLowerCase())
  const anecdotes = useSelector((state: StateType) =>
    state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter)))

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
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

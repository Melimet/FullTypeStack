import { Link } from "react-router-dom"
import { AnecdoteType } from "../types"

interface AnecdoteListProps{
  anecdotes: AnecdoteType[]
}

const AnecdoteList = ({ anecdotes }: AnecdoteListProps) => (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map((anecdote) => (
      <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
        <p>{anecdote.content}</p>
      </Link>
    ))}
  </div>
)

export default AnecdoteList

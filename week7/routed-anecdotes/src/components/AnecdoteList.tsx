import { Link } from "react-router-dom"
import Anecdote from "./Anecdote"

const AnecdoteList = ({ anecdotes }) => (
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

import { AnecdoteType } from "../types"

interface AnecdoteProps{
  anecdote: AnecdoteType
}

function Anecdote({anecdote}: AnecdoteProps) {
  return (
    <div>
      <h2>"{anecdote.content}"</h2>
      <p>-{anecdote.author}</p>
      <p>likes: {anecdote.votes}</p>
      <p>More info: {anecdote.info}</p>
    </div>
  )
}

export default Anecdote
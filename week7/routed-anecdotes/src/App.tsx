import { useState } from "react"
import { Route, Routes, useMatch } from "react-router-dom"
import About from "./components/About"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/CreateNew"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import "./App.css"
import { AnecdoteType } from "./types"
import Anecdote from "./components/Anecdote"
import Note from "./components/Note"

const App = () => {
  const [anecdotes, setAnecdotes] = useState<AnecdoteType[]>([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])

  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((anec) => anec.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState("")

  function updateNotification(message: string) {
    setNotification(message)
    setTimeout(() => setNotification(""), 5000)
  }

  const addNew = (anecdote: AnecdoteType) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id)

  const vote = (id: number) => {
    const anecdote = anecdoteById(id)

    if (!anecdote) return

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Note notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/newAnecdote" element={<CreateNew addNew={addNew} updateNotification={updateNotification} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

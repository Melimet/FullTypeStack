import "./App.css"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import  { initializeAnecdotes } from "./reducers/anecdoteReducer"


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <div className="App">
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App

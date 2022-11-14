import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/newAnecdote">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  )
}

export default Menu
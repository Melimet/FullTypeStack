import { Link } from 'react-router-dom'
import LoggedIn from './LoggedIn'

function Navigation() {


  return (
    <nav className='navbar'>
      <h2 className="title">blogs</h2>
      <Link to="/">
        blogs
      </Link>
      <LoggedIn />
    </nav>
  )
}

export default Navigation

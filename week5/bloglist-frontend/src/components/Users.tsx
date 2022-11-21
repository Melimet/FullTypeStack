import { Link } from 'react-router-dom'
import { UserResponseType } from '../types'

function Users({ users }: { users: UserResponseType[] }) {
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.username}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>, blogs:{' '}
          {user.blogs.length}
        </p>
      ))}
    </div>
  )
}

export default Users

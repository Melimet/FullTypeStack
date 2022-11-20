import axios from 'axios'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/users'
import { UserResponseType } from '../types'



function Users() {
  const [users, setUsers] = useState<UserResponseType[]>([])

  useEffect(() => {
    getUsers()
    async function getUsers() {
      const res = await fetchUsers()
      setUsers(res)
    }
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.username}>{user.username}, blogs: {user.blogs.length}</p>
      ))}
    </div>
  )
}

export default Users

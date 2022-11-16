import { User } from '../models/user'
import { NewUserType } from '../types'

async function usersInDb() {
  const users = await User.find({}).populate('blogs')
  return users.map((user) => user.toJSON())
}

async function validateUser({
  username,
  name,
  password,
}: NewUserType): Promise<NewUserType | { error: string }> {
  if (!username || !name || !password) {
    return { error: 'Some of the parameters are missing.' }
  }

  if ([username, name, password].some((value) => value.length < 3)) {
    return { error: 'Some of the parameters are too short.' }
  }
  const users = await usersInDb()

  if (users.some((user) => user.username === username)) {
    return { error: 'Username already taken.' }
  }
  return { username, name, password }
}

export { validateUser, usersInDb }

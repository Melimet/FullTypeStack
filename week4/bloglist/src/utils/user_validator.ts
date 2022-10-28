import { User } from "../models/user";
import { NewUserType } from "../types";

async function usersInDb() {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

async function validateUser(maybeUser: NewUserType | undefined): Promise<NewUserType | undefined> {
  
  if (!maybeUser?.username || !maybeUser?.name || !maybeUser?.password) return undefined
  const {username, name, password } = maybeUser
  if ([username, name, password].some((value) => value.length < 3)) return undefined

  const users = await usersInDb()
  
  if (users.some((user) => user.username === username)) return undefined

  return {username, name, password}
}

export {validateUser}
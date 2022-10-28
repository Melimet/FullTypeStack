import express from "express"
import bcrypt from "bcrypt"
import { User } from "../models/user"

const userRouter = express.Router()

userRouter.get("/", async (_request, response) => {
  const users = await User.find({})
  return response.json(users)
})

userRouter.post("/", async (request, response) => {

  const { username, name, password } = request.body
  

  if (!username || !name || !password) return response.status(400).end()

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const createdUser = await newUser.save()

  if (!createdUser) return response.status(400).end()
  
  return response.status(201).json(createdUser)

})

export { userRouter }

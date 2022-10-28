import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import { User } from "../models/user"

const loginRouter = express.Router()

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  if (!username || !password)
    return response.status(400).send({ error: "Missing username or password." })

  const user = await User.findOne({ username })

  if (!user?.passwordHash)
    return response.status(400).send({ error: "No passwordhash." })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  console.log(passwordCorrect)
  if (!passwordCorrect)
    return response.status(400).send({ error: "Invalid username or password." })

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET as string)

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export { loginRouter }

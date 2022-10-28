import express from "express"
import bcrypt from "bcrypt"
import { User } from "../models/user"
import { validateUser } from "../utils/user_validator"
import { NewUserType } from "../types"

const userRouter = express.Router()

userRouter.get("/", async (_request, response) => {
  const users = await User.find({})
  return response.json(users)
})

userRouter.post("/", async (request, response) => {

  const user: NewUserType | undefined = await validateUser(request.body)
  

  if (!user) return response.status(400).send({error: "Insufficient or invalid parameters."})

  const passwordHash = await bcrypt.hash(user.password, 10)

  const newUser = new User({
    username: user.username,
    name: user.name,
    passwordHash,
  })

  const createdUser = await newUser.save()

  if (!createdUser) return response.status(400).send({ error: "Creation of user failed." })
  
  return response.status(201).json(createdUser)

})

export { userRouter }

import express from "express"
import { User } from "../models"

const userRouter = express.Router()

userRouter.get("/", async (_req, res) => {
  const users = await User.findAll()
  return res.json(users)
})

userRouter.post("/", async (req, res) => {
  const user = req.body
  const newUser = await User.create(user)
  return res.json(newUser)
})

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    return res.json(user)
  }
  return res.status(404).end()
})

userRouter.put("/:id", async (req, res) => {
  const user = req.body
  const updatedUser = await User.update(user, {
    where: {
      id: req.params.id
    }
  })
  
  if (!updatedUser) {
    return res.status(404).end()
  }

  return res.status(204).send(updatedUser)
})


export default userRouter
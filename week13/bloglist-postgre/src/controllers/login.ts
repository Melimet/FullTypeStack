import jwt from 'jsonwebtoken'
import express from 'express'
import { User } from '../models'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = true

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }


  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, "asd123")

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter
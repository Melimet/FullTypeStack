import express from 'express'
import cors from 'cors'
import { blogRouter } from './routes/blog'
import { MONGODB_URI } from './utils/config'
import mongoose from 'mongoose'
import { userRouter } from './routes/user'
import { loginRouter } from './routes/login'
import { tokenExtractor } from './utils/tokenProcessing'

require('express-async-errors')
const app = express()
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Db connection succesful')
  })
  .catch((err) => {
    console.log('mongo err: ', err)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./routes/testRoute')
  app.use('/api/testRoute', testRouter)
}
export { app }

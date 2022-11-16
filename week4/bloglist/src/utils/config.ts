require('dotenv').config()

const PORT = process.env.PORT || 3003
const mongoUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

if (!mongoUrl) {
  console.log('no url for mongo, critical failure')
  process.exit()
}

const MONGODB_URI = mongoUrl

export { MONGODB_URI, PORT }

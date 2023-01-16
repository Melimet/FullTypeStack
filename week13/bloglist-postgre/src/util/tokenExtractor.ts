import jwt from 'jsonwebtoken'

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), "asd123")
    } catch (e) {
      console.error(e)
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  }
  next()
}

export default tokenExtractor
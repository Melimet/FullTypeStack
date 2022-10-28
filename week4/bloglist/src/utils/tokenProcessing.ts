import { Request, Response } from "express"
import { User } from "../models/user"
import jwt from "jsonwebtoken"

export interface CustomRequest extends Request {
  token: string
  user: string
}

type Next = () => void | Promise<void>

function tokenExtractor(request: Request, _response: Response, next: Next) {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    ;(request as CustomRequest).token = authorization.substring(7)
  }
  next()
}

//@ts-ignore:next-line Not All paths return a value
async function userExtractor(request: Request, response: Response, next: Next) {
  if (!(request as CustomRequest).token) return next()
  const decodedToken = jwt.verify(
    (request as CustomRequest).token,
    process.env.SECRET as string
  )

  if (!decodedToken || typeof decodedToken === "string" || !decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" })

  const user = await User.findById(decodedToken.id)

  if (!user?.id)
    return response.status(400).json({ error: "User not found." });

  (request as CustomRequest).user = user.id
  next()
}

export { tokenExtractor, userExtractor }

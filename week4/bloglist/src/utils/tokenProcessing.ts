import { Request, Response } from "express";

export interface CustomRequest extends Request {
  token: string
}

type Next = () => void | Promise<void>;


function getTokenFrom(request: Request, _response: Response, next: Next) {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    (request as CustomRequest).token = authorization.substring(7)
  }
  next()
}

export {getTokenFrom}
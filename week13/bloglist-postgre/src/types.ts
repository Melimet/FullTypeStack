import { Request } from 'express'

export interface CustomRequest extends Request {
  decodedToken: {
    id: string
    username: string
  }
}
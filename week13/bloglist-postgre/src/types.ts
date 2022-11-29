import { Blog } from "./models";



declare global {
  namespace Express {
    export interface Request {
      blog: Blog | null
    }
  }
}
import Blog from "../models/blog"
import User from "./user"

Blog.sync()
User.sync()

export { Blog, User }
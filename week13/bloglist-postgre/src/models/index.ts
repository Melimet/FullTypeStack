import Blog from "../models/blog"
import User from "./user"

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({alter: true})
User.sync({alter: true})

export { Blog, User }
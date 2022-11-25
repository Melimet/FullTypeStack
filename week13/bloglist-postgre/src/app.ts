import express from "express"
import { DataTypes, Model, QueryTypes, Sequelize } from "sequelize"
require("dotenv").config()

const app = express()

app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Hello World!")
})
if (!process.env.DATABASE_URL) {
  console.log("No database url provided")
  process.exit(1)
}

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)
Blog.sync()

app.get("/api/blogs", async (_req, res) => {
  const blogs = await Blog.findAll()
  console.log(blogs)
  return res.json(blogs)
})

app.post("/api/blogs", async (req, res) => {
  const blog = req.body
  const newBlog = await Blog.create(blog)
  return res.json(newBlog)
})

app.delete("/api/blogs/:id", async (req, res) => {

  const id = req.params.id
  const deletedBlog = await Blog.destroy({
    where: {
      id: id,
    },
  })
  return res.json(deletedBlog)  
})


export { app }

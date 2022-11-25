import express from "express"
import { QueryTypes, Sequelize } from "sequelize"
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

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
    console.log(blogs)
    sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

main()

export { app }

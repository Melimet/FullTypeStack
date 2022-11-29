require("dotenv").config()

const PORT = process.env.PORT || 3001
const DATABASE_URL =
  process.env.DATABASE_URL ||
  (console.log("no db url provided, exiting"), process.exit(1))

export { PORT, DATABASE_URL }

import mongoose from "mongoose"
import supertest from "supertest"
import { app } from "../app"
import { User } from "../models/user"

const api = supertest(app)

const testUser = {
  username: "testusername",
  name: "testname",
  password: "asd123",
}

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe("User-requests", () => {
  test("Users are returned as json", async () => { 
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })
  test("Post request to /api/users creates a new user", async () => {
    const response = await api.post("/api/users").send(testUser).expect(201)
    expect(response.body.username).toContain("testusername")
  })
  test("Post request without username leads to 400", async () => {
    const user = {
      name: "testname",
      password: "asd123",
    }
    const response = await api.post("/api/users").send(user).expect(400)
    expect(response.body).toEqual({ error: "Insufficient or invalid parameters." })
  })
})
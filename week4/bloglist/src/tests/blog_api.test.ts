import mongoose from "mongoose"
import supertest from "supertest"
import { app } from "../app"
import { Blog } from "../models/blog"
import { blogs } from "./testblogs"
import { BlogType } from "../types"

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe("Blog-api requests", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("Get request returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(blogs.length)
  })

  test("returned blogs have attribute id, not _id", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].id).toBeDefined()
  })

  test("Post request to /api/blogs creates a new blog", async () => {
    const newBlog: BlogType = {
      title: "Test blog",
      author: "Test author",
      url: "Test url",
      likes: 0,
      id: "Test id",
    }

    const response = await api.post("/api/blogs").send(newBlog).expect(201)
    expect(response.body.author).toContain("Test author")
  })

  test("If likes is undefined, it is set to 0", async () => {
    const newBlog = {
      title: "test",
      author: "test",
      url: "test",
      id:"test_id",
    }

    const response = await api.post("/api/blogs").send(newBlog).expect(201)
    expect(response.body.likes).toBe(0)
  })
})

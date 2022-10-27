import mongoose from "mongoose"
import supertest from "supertest"
import { app } from "../app"
import { Blog } from "../models/blog"
import { blogs } from "./testblogs"
import { BlogType } from "../types"
import { blogsInDb } from "./helpers/test_helper"

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
    }

    const response = await api.post("/api/blogs").send(newBlog).expect(201)
    expect(response.body.author).toContain("Test author")
  })

  test("If likes is undefined, it is set to 0", async () => {
    const newBlog = {
      title: "test",
      author: "test",
      url: "test",
      id: "test_id",
    }

    const response = await api.post("/api/blogs").send(newBlog).expect(201)
    expect(response.body.likes).toBe(0)
  })

  test("If url or title is missing, 400 is returned", async () => {
    const newFaultyBlog = {
      author: "test",
    }
    await api.post("/api/blogs").send(newFaultyBlog).expect(400)
  })
  describe("Delete request", () => {
    test("with correct id, correct blog is removed", async () => {
      const allBlogs = await blogsInDb()

      await api.delete(`/api/blogs/${allBlogs[0].id}`).expect(200)

      expect(await blogsInDb()).toHaveLength(blogs.length - 1)
    })
    test("with incorrect id, nothing is deleted and 404 is returned", async () => {
      await api.delete("/api/blogs/635a4289fea468f7a3d9566b").expect(404) //incorrect id
      expect(await blogsInDb()).toHaveLength(blogs.length)
    })
  })
  describe("Put request", () => {
    test("with correct id and parameters, resource is updated", async () => {
      const allBlogs = await blogsInDb()
      const updatedBlog = {
        title: "testTitle",
        author: "TestAuthor",
        url: "testUrl",
        likes: "235",
      }

      const response = await api
        .put(`/api/blogs/${allBlogs[0].id}`)
        .send(updatedBlog)
        .expect(200)

      expect(response.body.title).toStrictEqual("testTitle")
    })

    test("with incorrect id, nothing is updated", async () => {
      const updatedBlog = {
        title: "testTitle",
        author: "TestAuthor",
        url: "testUrl",
        likes: "235",
      }
      await api
        .put("/api/blogs/635a4289fea468f7a3d9566b")
        .send(updatedBlog)
        .expect(404) //incorrect id
    })
  })
})

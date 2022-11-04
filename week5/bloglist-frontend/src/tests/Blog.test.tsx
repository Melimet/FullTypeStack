import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import React from "react"
import Blog from "../components/Blog"
import { BlogType, UserType } from "../types"

test("Blog only renders title", () => {
  const blog: BlogType = {
    title: "testTitle",
    url: "url",
    likes: 0,
    id: "123",
    author: "testAuthor",
  }
// @ts-ignore
  render(<Blog blog={blog} />)
 
  const title = screen.getByText("testTitle")
  expect(title).toBeDefined()

  const author = screen.queryByText("testAuthor")
  expect(author).toBeNull()


})



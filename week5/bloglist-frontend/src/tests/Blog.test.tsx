import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import React from "react"
import Blog from "../components/Blog"
import { BlogType, UserType } from "../types"
import userEvent from '@testing-library/user-event'
import { expect } from '@jest/globals';

describe("Blog", () => {
  const blog: BlogType = {
    title: "testTitle",
    url: "url",
    likes: 0,
    id: "123",
    author: "testAuthor",
  }

  test("only renders title", () => {
    // @ts-ignore
    render(<Blog blog={blog} />)

    const title = screen.getByText("testTitle")
    expect(title).toBeDefined()

    const author = screen.queryByText("testAuthor")
    expect(author).toBeNull()
  })
  test("after click, all values are rendered", async () => {
    //const mockHandler = jest.fn()

    // @ts-ignore
    render(<Blog blog={blog} /> )

    const user = userEvent.setup()
    const button = screen.getByText('show')

    await user.click(button)

    const author = screen.queryByText("testAuthor")
    expect(author).toBeDefined()

  })
})
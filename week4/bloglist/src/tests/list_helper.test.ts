import { Blog } from "../types"
import { dummy, favoriteBlog, totalLikes } from "../utils/list_helper"
import { blogs, listWithOneBlog } from "./testblogs"

test("dummy returns one", () => {
  const blogs: Blog[] = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
    test("when list has only 1 blog it shows it's likes", () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  
  test("with multiple blogs, likes sum is counted correctly", () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })

  test("with empty list, 0 is returned", () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

})

describe("favorite blog", () => {
  test("with empty list, return is undefined", () => {
    const result = favoriteBlog([])
    expect(result).toBe(undefined)
  }) 
  test("with multiple, blog with most likes is returned", () => {
    const result = favoriteBlog(blogs)
    expect(result?.title).toBe("Canonical string reduction")
  })
  test("with one blog, it is returned", () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result?.title).toBe("Go To Statement Considered Harmful")
  })
})
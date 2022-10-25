import { Blog } from "../types"
import { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes } from "../utils/list_helper"
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

describe("Most blogs", () => {
  test("with empty list, undefined is returned", () => {
    const result = mostBlogs([])

    expect(result).toBe(undefined)    
  })
  test("with one blog, correct blogger is returned", () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toStrictEqual({author: "Edsger W. Dijkstra", writtenBlogs: 1})
  })
  test("with multiple blogs, blog with most likes is returned", () => {
    const result = mostBlogs(blogs)
    expect(result).toStrictEqual({author: "Robert C. Martin", writtenBlogs: 3})
  })
})

describe("Most likes", () => {
  test("with empty list, undefined is returned", () => {
    const result = mostLikes([])
    
    expect(result).toBe(undefined)
  })
  test("with one blog, that blog is returned", () => {
    const result = mostLikes(listWithOneBlog)

    expect(result).toStrictEqual({author: "Edsger W. Dijkstra", likes: 5})
  })
  test("with multiple blogs, blog with most likes is returned", () => {
    const result = mostLikes(blogs)

    expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", "likes": 17})
  })
})
import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { BlogType } from "../types"
import blogService from "../services/blogs"
import createBlogService from "../services/newBlog"

const initialState = [] as BlogType[]

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    newBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export function initializeBlogs() {
  return async (dispatch: Dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export function createBlog(content: {author: string, title: string, url: string}) {
  return async (dispatch: Dispatch) => {
    const response = await createBlogService.createBlog(content)
    dispatch(newBlog(response))
  }
}

export const { newBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
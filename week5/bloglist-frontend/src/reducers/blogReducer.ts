import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { BlogType } from '../types'
import blogService from '../services/blogs'
import createBlogService from '../services/newBlog'

const initialState = [] as BlogType[]

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    newBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlogs(state, action) {
      const blog = action.payload

      const newBlogs = [...state].map((b) => (b.id !== blog.id ? b : blog))
      return newBlogs
    },
    deleteBlog(state, action) {
      const blog = action.payload

      const newBlogs = [...state].filter((b) => b.id !== blog.id)
      return newBlogs
    },
  },
})

export function initializeBlogs() {
  return async (dispatch: Dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export function createBlog(content: {
  author: string
  title: string
  url: string
}) {
  return async (dispatch: Dispatch) => {
    const response = await createBlogService.createBlog(content)
    dispatch(newBlog(response))
  }
}

export function removeBlog(blog: BlogType) {
  return async (dispatch: Dispatch) => {
    const result = await blogService.deleteBlog(blog)
    dispatch(deleteBlog(result))

    return result
  }
}

export function updateLike(blog: BlogType) {
  return async (dispatch: Dispatch) => {
    const blogCopy = { ...blog }

    const result = await blogService.addLike(blogCopy)

    dispatch(updateBlogs(result))

    return result
  }
}

export const { newBlog, setBlogs, updateBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

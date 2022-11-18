import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { UserType } from '../types'
import newBlogService from '../services/newBlog'

const initialState = {} as UserType

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return action.payload
    },
  },
})

export function initializeLoginState() {
  return async (dispatch: Dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      dispatch(updateUser(parsedUser))
      newBlogService.setToken(parsedUser?.token)
    }
  }
}

export function loginUser(user: UserType) {
  return async (dispatch: Dispatch) => {}
}

export function logOutUser() {
  return async (dispatch: Dispatch) => {
    dispatch(updateUser(initialState))
  }
}

export const { updateUser } = loginSlice.actions
export default loginSlice.reducer

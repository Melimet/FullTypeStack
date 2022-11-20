import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { UserType } from '../types'
import newBlogService from '../services/newBlog'
import newBlog from '../services/newBlog'
import login, { Credentials } from '../services/login'

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

export function loginUser({username, password}: Credentials) {
  return async (dispatch: Dispatch) => {
    const user = await login({ username, password })

    if (!user) return

    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    newBlogService.setToken(user.token)
    dispatch(updateUser(user))

  }
}

export function logOutUser() {
  return async (dispatch: Dispatch) => {
    dispatch(updateUser(initialState))

    window.localStorage.removeItem('loggedUser')
    newBlog.setToken('')
  }
}

export const { updateUser } = loginSlice.actions
export default loginSlice.reducer

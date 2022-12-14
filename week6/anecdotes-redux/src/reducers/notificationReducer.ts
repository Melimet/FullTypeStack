import { createSlice, Dispatch } from "@reduxjs/toolkit"

const initialState = ""
let timer: ReturnType<typeof setTimeout>

const notificationSlice = createSlice({
  name: "notications",
  initialState,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return content
    },
    deleteNotification(state, action) {
      return ""
    },
  },
})

export function createNotification(message: string, time: number) {
  return async (dispatch: Dispatch) => {
    dispatch(setNotification(message))

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      dispatch(deleteNotification(""))
    }, time*1000)
  }
}

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer

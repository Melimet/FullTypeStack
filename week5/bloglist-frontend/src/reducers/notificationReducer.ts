import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { NotificationType } from "../types"

const initialState = {
  message: "",
  success: false
}

let timer: ReturnType<typeof setTimeout>


const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export function createNotification(notification: NotificationType, time: number) {
  return async (dispatch: Dispatch) => {
    dispatch(setNotification(notification))

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, time*1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
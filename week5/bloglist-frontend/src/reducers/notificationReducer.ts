import { createSlice, Dispatch } from "@reduxjs/toolkit"

const initialState = ""
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

export function createNotification(message: string, time: number) {
  return async (dispatch: Dispatch) => {
    dispatch(setNotification(message))

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      dispatch(setNotification(""))
    }, time*1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: "notications",
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log(action.payload)
      const content = action.payload
      return content
    },
    deleteNotification(state, action) {
      return ""
    }
  }
})

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer
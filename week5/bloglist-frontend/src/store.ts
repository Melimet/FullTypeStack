import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";


const store = configureStore({
  reducer: {
    notifications: notificationReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
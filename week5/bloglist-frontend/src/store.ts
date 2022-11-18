import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer"

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: loginReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
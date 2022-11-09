import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import reducer from "./reducers/anecdoteReducer"
import { createStore } from 'redux'

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

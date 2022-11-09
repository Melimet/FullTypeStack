import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

function renderApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>
  )
}

renderApp()
store.subscribe(renderApp)
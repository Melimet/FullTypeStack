import { Action, Store } from "redux"

interface AppProps {
  store: Store<{ good: number; ok: number; bad: number }, Action>
}

function App({ store }: AppProps) {
  
  function handleClick(type: string) {
    return () => {
      store.dispatch({
        type,
      })
    }
  }

  return (
    <div>
      <button onClick={handleClick("GOOD")}>good</button>
      <button onClick={handleClick("OK")}>ok</button>
      <button onClick={handleClick("BAD")}>bad</button>
      <button onClick={handleClick("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

export { App }

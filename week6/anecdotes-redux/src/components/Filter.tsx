import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

function Filter() {
  const dispatch = useDispatch()

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    dispatch(setFilter(event.currentTarget.value))    
  }
  
  const style = {
    margin: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default Filter
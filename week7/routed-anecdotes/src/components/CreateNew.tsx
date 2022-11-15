import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/useField"



const CreateNew = (props) => {
  const contentField = useField('content')
  const authorField = useField('author')
  const infoField = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value, 
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    })
    navigate('/')
    props.updateNotification("Note created succesfully!")
  }

  function handleReset() {
    const fields = [ contentField, authorField, infoField ]
    const event = {
      target: {
        value: ""
      }
    }
    fields.forEach((field) => field.onChange(event))
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            {...contentField}
          />
        </div>
        <div>
          author
          <input
            {...authorField}
          />
        </div>
        <div>
          url for more info
          <input
            {...infoField}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="reset">reset</button>
      </form>
    </div>
  )
}

export default CreateNew
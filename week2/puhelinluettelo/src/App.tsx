import React, { useState } from "react"
import { AddContact } from "./Components/AddContact"
import { Contacts } from "./Components/Contacts"
import { Filter } from "./Components/Filter"

export interface Person {
  name: string
  number: string
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  
  const [currentFilter, setFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setPhoneNumber] = useState("")

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>): void {
    setFilter(event.target.value)
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewName(event.target.value)
  }

  function handlePhoneNumber(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhoneNumber(event.target.value)
  }

  function handleSubmit(event: React.MouseEvent): void {
    event.preventDefault()

    const newPerson = { name: newName, number: newPhoneNumber }
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`person ${newPerson.name} already exists`)
      return
    }

    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} currentFilter={currentFilter} />
      <AddContact
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumber={handlePhoneNumber}
        handleSubmit={handleSubmit}
      />
      <Contacts persons={persons} currentFilter={currentFilter} />
    </div>
  )
}

export default App

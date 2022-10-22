import axios from "axios"
import React, { useEffect, useState } from "react"
import { AddContact } from "./Components/AddContact"
import { Contacts } from "./Components/Contacts"
import { Filter } from "./Components/Filter"
import { createContact } from "./services/contacts"

export interface Person {
  name: string
  number: string
  id: number
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])

  const [currentFilter, setFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    getPersonsFromDb()
    async function getPersonsFromDb() {
      const response = await axios.get("http://localhost:3001/persons")
      setPersons(await response.data)
    }
  }, [])

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>): void {
    setFilter(event.target.value)
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewName(event.target.value)
  }

  function handlePhoneNumber(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhoneNumber(event.target.value)
  }

  function removeContactFromState(removedPerson: Person) {
    const newPersons = persons.filter((person) => person.id != removedPerson.id)
    setPersons(newPersons)
  }

  function handleSubmit(event: React.MouseEvent): void {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
      id: persons.length + 1,
    }
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`person ${newPerson.name} already exists`)
      return
    }

    createContact(newPerson)
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
      <Contacts
        persons={persons}
        currentFilter={currentFilter}
        removeContactFromState={removeContactFromState}
      />
    </div>
  )
}

export default App

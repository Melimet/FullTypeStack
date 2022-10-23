import axios from "axios"
import React, { useEffect, useState } from "react"
import { AddContact } from "./Components/AddContact"
import { Contacts } from "./Components/Contacts"
import { Filter } from "./Components/Filter"
import { createContact, updateContactInDB } from "./services/contacts"
import { Notification } from "./Components/Notification"

export interface Person {
  name: string
  number: string
  id?: number
}

export interface Message{
  message: string,
  goodNews: boolean
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])

  const [currentFilter, setFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState<Message>({
    message: "",
    goodNews: false,
  })

  const baseUrl="/api/persons"
  useEffect(() => {
    getPersonsFromDb()
    async function getPersonsFromDb() {
      const response = await axios.get(baseUrl)
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
    console.log("🚀 ~ file: App.tsx ~ line 55 ~ removeContactFromState ~ newPersons", newPersons)

    setPersons(newPersons)
    setMessage({message: `${removedPerson.name} removed from contacts`, goodNews:true})
  }

  function updateContact(newPerson: Person) {
    const foundPerson = persons.find((person) => person.name === newPerson.name)
    if (!foundPerson) return

    const updatedContact: Person = { ...newPerson, id: foundPerson.id }

    updateContactInDB(updatedContact)

    const updatedPersons = persons.filter(
      (person) => person.name !== updatedContact.name
    )
    setPersons(updatedPersons.concat(updatedContact))
    setMessage({message: "Contact updated!", goodNews: true})
  }

  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }
    if (persons.some((person) => person.name === newPerson.name)) {
      if (confirm(`person ${newPerson.name} already exists, update number?`)) {
        updateContact(newPerson)
      }
      return
    }

    const createdPerson = await createContact(newPerson)

    if (!createdPerson) return 


    setPersons(persons.concat(createdPerson))
    setMessage({message: "New contact added!", goodNews: true})
  }

  function createMessage(incomingMessage: Message) {
    setMessage(incomingMessage)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} goodNews={message.goodNews} />
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
        createMessage={createMessage}
      />
    </div>
  )
}

export default App

import axios from 'axios'
import { Person } from '../App'

const baseUrl = "http://localhost:3001/persons"

function createContact(newContact: Person) {
  return axios.post(baseUrl, newContact)
}

async function removeContact(person: Person) {
  const result = await axios.delete(`${baseUrl}/${person.id}`)
  return result.status
}

function updateContactInDB(contact: Person) {
  return axios.put(`${baseUrl}/${contact.id}`, contact)
}

export { createContact, removeContact, updateContactInDB}
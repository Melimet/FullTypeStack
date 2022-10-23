import axios from 'axios'
import { Person } from '../App'

const baseUrl = "/api/persons"

async function createContact(newContact: Person) {
  const res = await axios.post<Person>(baseUrl, newContact)
  if (res.status == 400) return undefined

  return res.data
}

async function removeContact(person: Person) {
  const result = await axios.delete(`${baseUrl}/${person.id}`)
  return result.status
}

function updateContactInDB(contact: Person) {
  return axios.put(`${baseUrl}/${contact.id}`, contact)
}

export { createContact, removeContact, updateContactInDB}
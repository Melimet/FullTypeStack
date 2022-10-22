import axios, { Axios } from 'axios'
import { Person } from '../App'

const baseUrl = "http://localhost:3001/persons"

function createContact(newContact: Person) {
  console.log(newContact)
  return axios.post(baseUrl, newContact)
}

export { createContact }
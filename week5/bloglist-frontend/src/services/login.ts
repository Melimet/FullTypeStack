import axios from 'axios'
import { UserType } from '../types'

const baseUrl = 'http://localhost:3003/api/login'

export interface Credentials {
  username: string
  password: string
}

async function login(credentials: Credentials): Promise<UserType> {

  const response = await axios.post(baseUrl, credentials)
  console.log('RESPONSE', response)
  return response.data
}

export default login

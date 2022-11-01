import axios from 'axios'

const baseUrl = "http://localhost:3003/api/login"

interface Credentials{
  username: string
  password: string
}

async function login(credentials: Credentials) {
  console.log("🚀 ~ file: login.ts ~ line 11 ~ login ~ credentials", credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log("RESPONSE",response)
  return response.data
}

export default login
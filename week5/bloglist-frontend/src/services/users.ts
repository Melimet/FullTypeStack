import axios from "axios";
import { UserResponseType } from "../types";
const baseUrl = 'http://localhost:3003/api/users'


export async function fetchUsers():Promise<UserResponseType[]> {
  const res = await axios.get(baseUrl)
  return res.data
}


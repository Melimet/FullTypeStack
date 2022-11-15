import axios from "axios"
import { useEffect, useState } from "react"

export function useResource(address: string) {

  const baseUrl = address

  let token = null

  const [obj, setObj] = useState([])

  useEffect(() => {
    setAll()
    async function setAll() {
      const res = await getAll()
      setObj(res)
    }
  },[address])

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    const response = request
    return response.data
  }

  const create = async (newObject) => {
    
    console.log("called")

    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setObj(obj.concat(response.data))
    return response.data
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
  }
  
  return [
    obj
    ,
    {
      setToken,
      getAll,
      create,
      update,
    },
  ]
}

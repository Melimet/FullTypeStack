import React from "react";
import { useState } from "react"
import login from "../services/login"
import { UserType } from "../types";

type LoginFormProps =
  { setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>; }


function LoginForm({setUser}: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    try {
      const user = await login({ username, password })

      window.localStorage.setItem(
        "loggedUser", JSON.stringify(user)
      )

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error in logging in ")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm

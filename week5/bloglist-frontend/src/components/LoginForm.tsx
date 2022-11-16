import React from 'react'
import { useState } from 'react'
import login from '../services/login'
import { UserType } from '../types'
import { Notification } from '../types'

type LoginFormProps = {
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

function LoginForm({ setUser, setNotification }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    try {
      const user = await login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        message: 'Login successful',
        success: true,
      })
    } catch (exception) {
      setNotification({
        message: 'Username and/or password incorrect',
        success: false,
      })
      console.log('error in logging in ')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

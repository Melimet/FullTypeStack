import React from 'react'
import { useState } from 'react'
import login from '../services/login'
import { UserType } from '../types'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

type LoginFormProps = {
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

function LoginForm({ setUser }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    try {
      const user = await login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(
        createNotification(
          {
            message: 'Login successful',
            success: true,
          },
          3.5
        )
      )
    } catch (exception) {
      dispatch(
        createNotification(
          {
            message: 'Username and/or password incorrect',
            success: false,
          },
          3.5
        )
      )
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

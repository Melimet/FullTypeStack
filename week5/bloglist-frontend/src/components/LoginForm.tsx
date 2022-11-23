import React from 'react'
import { useState } from 'react'
import { createNotification } from '../reducers/notificationReducer'
import { useAppDispatch } from "../hooks/dispatchHooks"
import { loginUser } from '../reducers/loginReducer'



function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    try {

      await dispatch(loginUser({username, password}))

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
      <p>Test login credentials name: Kalevi123 password: Kalevi123</p>
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

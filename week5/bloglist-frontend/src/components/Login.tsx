import { useState } from "react"

function Login() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    console.log("login")
  }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={}></input>
        </div>
      </form>
    </div>
  )


}

export Login
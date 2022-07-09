import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    login({
      username: username,
      password: password,
    })

    setNewUsername('')
    setNewPassword('')
  }

  return (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={loginUser}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setNewUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
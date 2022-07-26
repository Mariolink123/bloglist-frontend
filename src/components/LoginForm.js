import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Button, TextField } from '@mui/material'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username, password: password }))
    setNewUsername('')
    setNewPassword('')
  }

  const fieldStyle = {
    marginBottom: 10,
  }

  const headingStyle = {
    fontFamily: 'Roboto'
  }

  const containerStyle = {
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    //border: 'solid 1px'
  }



  return (
    <div style = {containerStyle}>
      <div>
        <h2 style = {headingStyle}>Log into application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField label="username" onChange={(event) => setNewUsername(event.target.value)} style={fieldStyle} />
          </div>
          <div>
            <TextField label="password" onChange={(event) => setNewPassword(event.target.value)} style={fieldStyle}/>
          </div>
          <Button variant="contained" color="primary" type="submit">
          login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

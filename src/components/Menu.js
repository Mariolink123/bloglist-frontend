import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = ({ user }) => {


  const navBar = {
    padding: '5px'
  }

  const textStyle = {
    marginLeft: 5,
    fontFamily: 'Roboto'
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <div style = {navBar}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
            blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
            users
            </Button>
            <Button color="inherit" onClick={handleLogout}>
            logout
            </Button>
            <strong style={textStyle}>{user.name} logged-in</strong>
          </Toolbar>
        </AppBar>
      </div>
    </>
  )

}

export default Menu
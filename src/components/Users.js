import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const blogsCreated = user.blogs.length

  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{blogsCreated}</td>
    </tr>
  )
}


const Users = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  const textStyle = {
    fontFamily: 'Roboto'
  }

  return (
    <>
      <h2 style={textStyle}>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <User key = {user.id} user = {user}></User>
          ))}
        </tbody>
      </table>
    </>
  )
}



export default Users
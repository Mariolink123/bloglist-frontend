import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserPage = () => {

  const userMatch = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  let user = null
  if (users && userMatch) {
    user = userMatch
      ? users.find(user => user.id === userMatch.params.id)
      : null
  }

  if (!user) {
    return (
      <>
      </>
    )
  }

  const blogs = user.blogs
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <p></p>
      {blogs.map(blog => <li key = {blog.id}>{blog.title}</li>)}
      <p></p>

    </>
  )
}


export default UserPage
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, isOwner }) => {

  const [shown, setShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id.toString())
    }
  }

  if (shown) {
    return (
      <div className='shownNote' style={blogStyle}>
        {blog.title} <button onClick={() => setShown(!shown)}>hide</button> <br></br>
        {blog.url} <br></br>
      likes {blog.likes} <button onClick={addLike}>like</button> <br></br>
        {blog.user && blog.user.name} <br></br>
        {isOwner && <button onClick={handleDelete}>remove</button>}
      </div>
    )
  }

  return (
    <div className='simpleNote' style={blogStyle}>
      {blog.title} {blog.author} <button className='viewButton' onClick={() => setShown(!shown)}>view</button>
    </div>
  )
}

export default Blog
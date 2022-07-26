import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import  Comments from './Comments'


const BlogPage = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const blogMatch = useMatch('/blogs/:id')

  const blogs = useSelector(state => state.blogs)

  let blog = null

  if (blogs && blogMatch) {
    blog = blogMatch
      ? blogs.find(blog => blog.id === blogMatch.params.id)
      : null
  }

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification({ message: `liked ${blog.title}`, type: 'success' }, 3))
    } catch (error) {
      dispatch(setNotification({ message: `${error.response.data.error}`, type: 'error' }, 3))
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog))
        dispatch(setNotification({ message: `Deleted ${blog.title}`, type: 'success' }, 3))
      } catch (error) {
        dispatch(setNotification({ message: `${error.response.data.error}`, type:'error' }, 3))
      }
    }
  }

  if (!blog) {
    return (
      <>
      </>
    )
  }

  let isOwner = false

  if (user) {
    isOwner = user.username === blog.user.username
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button id="like-button" onClick={handleLike}>
          like
      </button>
      </p>
      <p>added by {blog.user.name}</p>
      <p></p>
      {isOwner && <button id="remove-button" onClick={handleDelete}>
          remove
      </button>
      }
      <Comments id = {blog.id} comments = {blog.comments}></Comments>
    </>
  )
}


export default BlogPage
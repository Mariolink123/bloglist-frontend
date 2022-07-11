import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (userObject) => {

    try {
      const user = await loginService.login(userObject)
      notify(
        'successfully logged in'
      )
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      notify(
        'wrong credentials', 'alert'
      )
    }
  }

  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(
          `Added ${blogObject.title} by ${blogObject.author}`
        )
      }).catch(error => {
        notify(
          `${error.response.data.error}`, 'alert'
        )
      })
  }

  const addLike = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        notify(
          `${error.response.data.error}`, 'alert'
        )
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeBlog = id => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify(
          `Deleted ${blogToDelete.title}`
        )
      })
      .catch(error => {
        notify(
          `${error.response.data.error}`, 'alert'
        )
        setBlogs(blogs.filter(b => b.id !== id))
      })

  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?

        <LoginForm login={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in  <button onClick={handleLogout}>logout</button></p>
          <div>
            <Togglable ref={blogFormRef} buttonLabel='create new blog'>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <Blogs removeBlog={removeBlog} addLike={addLike} blogs={blogs} user={user} />
          </div>
        </div>
      }
    </div>
  )
}

export default App

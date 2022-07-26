import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Container } from '@mui/material'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import Menu from './components/Menu'
import {
  Routes, Route,
} from 'react-router-dom'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <div>
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <Menu user = {user}/>
            <div>
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={
                  <>
                    <Blogs blogs={blogs} user={user} />
                    <Togglable ref={blogFormRef} buttonLabel="create new blog">
                      <BlogForm />
                    </Togglable>
                  </>
                } />
                <Route path="/users/:id" element={<UserPage/>} />
                <Route path="/blogs/:id" element={<BlogPage/>} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Container>
  )

}

export default App


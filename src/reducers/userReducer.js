import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification({ message: 'successfully logged in', type: 'success' }, 3))
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong credentials', type: 'error' }, 3))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
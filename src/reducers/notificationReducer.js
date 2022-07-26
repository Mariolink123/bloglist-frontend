import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

let currentTimeoutID

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setContent(state, action) {
      return action.payload
    },
    removeNotification(content) {
      return { message: '', type: content.type }
    }
  },
})


export const setNotification = (content, timeout) => {
  return async dispatch => {
    if (currentTimeoutID) { clearTimeout(currentTimeoutID) }
    dispatch(removeNotification(content))
    dispatch(setContent(content))
    currentTimeoutID = setTimeout(() => {
      dispatch(removeNotification(content))
    }, timeout * 1000)
  }
}

export const { setContent, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
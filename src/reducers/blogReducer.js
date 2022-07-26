import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    addComment(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(comment),
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    setBlog(state, action) {
      const blog = action.payload

      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      return state.filter((b) => (b.id !== blogToDelete.id))
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlog, appendBlog, setBlogs, deleteBlog, addComment } = blogSlice.actions

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch(setBlog(updatedBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, { comment })
    dispatch(addComment({ id, comment }))
  }
}

export default blogSlice.reducer

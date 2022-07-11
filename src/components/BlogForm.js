import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder='write here blog title'
          id='title-input'
        />
        <br></br>
        author:
        <input
          value={author}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder='write here blog author'
          id='author-input'
        />
        <br></br>
        url:
        <input
          value={url}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder='write here blog url'
          id='url-input'
        />
        <br></br>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
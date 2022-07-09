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
        />
        <br></br>
        author:
        <input
          value={author}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <br></br>
        url:
        <input
          value={url}
          onChange={(event) => setNewUrl(event.target.value)}
        />
        <br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
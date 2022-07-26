import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

  const blogStyle = {
  }

  return (
    <div className="simpleNote" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} {' '}</Link>
    </div>
  )
}

export default Blog

import Blog from './Blog'

const Blogs = ({ blogs, addLike, removeBlog, user }) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return <>
    {sortedBlogs.map(blog =>
      <Blog isOwner = {user.username === blog.user.username} removeBlog = {() => removeBlog(blog.id)} addLike = {() => addLike(blog.id)} blog = {blog} key = {blog.id}></Blog>
    )}
  </>
}

export default Blogs
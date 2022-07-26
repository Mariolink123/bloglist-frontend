import Blog from './Blog'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Blogs = ({ blogs }) => {

  const sortedBlogs = blogs.concat().sort((a, b) => b.likes - a.likes)

  const textStyle = {
    fontFamily: 'Roboto'
  }

  return (
    <>
      <h2 style={textStyle}>Blog List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key = {blog.id}>
                <TableCell>
                  <Blog blog={blog}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Blogs

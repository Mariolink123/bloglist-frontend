import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'test',
    author: test,
    likes: 10,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.simpleNote')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button renders the url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'test.com',
    author: 'testAuthor',
    likes: 10,
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      removeBlog={mockHandler}
      isOwner={true}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const newBlog = container.querySelector('.shownNote')
  const newUrl = screen.getByText('test.com', { exact: false })
  expect(newUrl).toBeDefined()
  expect(newBlog).toBeDefined()
  screen.debug()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'test.com',
    author: 'testAuthor',
    likes: 10,
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      addLike={mockHandler}
      removeBlog={mockHandler}
      isOwner={true}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

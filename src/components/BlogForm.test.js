import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write here blog title')
  const inputAuthor = screen.getByPlaceholderText('write here blog author')
  const inputUrl = screen.getByPlaceholderText('write here blog url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form' )
  await user.type(inputAuthor, 'test author' )
  await user.type(inputUrl, 'test.com' )
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form' )
  expect(createBlog.mock.calls[0][0].url).toBe('test.com' )
})
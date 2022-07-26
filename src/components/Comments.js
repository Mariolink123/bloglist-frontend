import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const Comments = ({ id, comments }) => {



  return (
    <>
      <h2>comments</h2>
      <CommentsForm id = {id} />
      {comments.map((comment, i) =>
        <li key = {i}>{comment}</li>
      )}
    </>
  )

}


const CommentsForm = ({ id }) => {

  const dispatch = useDispatch()

  const handleComment = () => {
    dispatch(commentBlog(id, comment))
  }

  const [comment, setNewComment] = useState('')

  return (
    <form onSubmit={handleComment}>
      <div>
        <input
          type="text"
          value={comment}
          name="NewComment"
          id="newcomment"
          onChange={(event) => setNewComment(event.target.value)}
        />
      </div>
      <button id="comment-button" type="submit">
          add comment
      </button>
    </form>
  )
}

export default Comments
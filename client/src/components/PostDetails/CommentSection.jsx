import React, { useState, useRef, useEffect } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles.js'
import { commentPost } from '../../actions/posts.js'

const CommentSection = ({ post }) => {
  const user = JSON.parse(window.localStorage.getItem('profile'))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [initialComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const commentRef = useRef()
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`

    const newComments = await dispatch(commentPost(finalComment, post._id))

    setComments(newComments)
    setComment('')
  }

  useEffect(() => {
    if (comments.length !== initialComments.length) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [comments])

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>Comments</Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>{comment.split(': ')[0]} </strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
      </div>
      {user?.result?.name && (
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant='h6'>Write a Comment</Typography>
          <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='Comment'
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick}>
            Comment
          </Button>
        </div>
      )}
    </div>
  )
}

export default CommentSection

import React, { useState } from 'react';
import { Button, Modal, Typography, Box } from '@mui/material';
import { FaRegComment } from 'react-icons/fa'

import { createComment } from '../../store/modules/comments/actions'
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const CreateComment = ({ postID = null }) => {

  const [modal, setModal] = useState(false);
  const [body, setBody] = useState("")

  const dispatch = useAppDispatch()

  const currentState = useAppSelector((state) => state);

  const addComment = details => dispatch(createComment(details, commentSuccess))

  const commentSuccess = () => {
    setModal(!modal);
  }

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  }

  const handleChange = e => {
    setBody(e.target.value)
  }

  const submitComment = (e) => {
    e.preventDefault()
    addComment({
      post_id: Number(postID),
      body
    })
  }

  return (
    <span>
      <FaRegComment className="style-heart " onClick={toggle} />

      <Modal
        open={modal}
        onClose={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box>
          <Typography id="transition-modal-title" variant="h6" component="h2">Comment</Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <textarea name="body" style={{ width: "100%", height: "150px" }} onChange={handleChange}></textarea>
            {currentState.commentsReducer.commentsError && currentState.commentsReducer.commentsError.Required_body ? (
              <small className="color-red">{currentState.commentsReducer.commentsError.Required_body}</small>
            ) : (
              ""
            )}
          </Typography>
          <div>
            {currentState.commentsReducer.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Saving...
              </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitComment}
                type="submit"
              >
                Comment
              </button>
            )}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </span>
  );
}

export default CreateComment;
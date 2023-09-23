import React, { useState, useEffect } from 'react';
import { Button, Modal, FormGroup, Box, Typography } from '@mui/material';
import { FaPencilAlt } from 'react-icons/fa'

import { updateComment } from '../../store/modules/comments/actions'
import { useAppDispatch, useAppSelector } from '../../types/hooks';

const EditComment = ({ comment }) => {

  const [modal, setModal] = useState(false);


  const [commentUpdate, setCommentUpdate] = useState("") as any

  const dispatch = useAppDispatch()

  const currentState = useAppSelector((state) => state);

  const theUpdate = details => dispatch(updateComment(details, updateSuccess))

  const updateSuccess = () => {
    setModal(!modal);
  }

  useEffect(() => {
    setCommentUpdate(comment)
  }, [comment]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
    setCommentUpdate(comment)
  }

  const handleChange = e => {
    setCommentUpdate(e.target.value) //since is just one value
  }

  const submitComment = (e) => {
    e.preventDefault()
    theUpdate({
      id: comment.id,
      body: commentUpdate,
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle} />

      <Modal
        open={modal}
        onClose={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box>
          <Typography id="transition-modal-title" variant="h6" component="h2" >Edit Comment</Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <FormGroup>
              <label>Content</label>
              <textarea className="form-control" name="body" style={{ width: "100%", height: "100px" }} defaultValue={commentUpdate.body} onChange={handleChange}></textarea>
              {currentState.commentsReducer.commentsError && currentState.commentsReducer.commentsError.Required_body ? (
                <small className="color-red">{currentState.commentsReducer.commentsError.Required_body}</small>
              ) : (
                ""
              )}
            </FormGroup>
          </Typography>
          <Typography>
            {currentState.commentsReducer.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Updating...
              </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitComment}
                type="submit"
              >
                Update
              </button>
            )}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}

export default EditComment;
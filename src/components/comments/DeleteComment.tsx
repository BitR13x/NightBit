import React, { useState } from 'react';
import { Backdrop, Box, Button, Modal, Typography } from '@mui/material';
import { FaRegTrashAlt } from 'react-icons/fa'

import { deleteComment } from '../../store/modules/comments/actions'
import { useAppDispatch, useAppSelector } from '../../types/hooks';


const DeleteComment = ({ comment }) => {

  const [modal, setModal] = useState(false);

  const dispatch = useAppDispatch()

  const currentState = useAppSelector((state) => state);

  const removeCommment = details => dispatch(deleteComment(details, deleteSuccess))

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  }

  //this callback should not listen for an event
  const deleteSuccess = () => {
    setModal(!modal);
  }

  const submitDelete = (e) => {
    e.preventDefault()
    removeCommment({
      id: comment.id,
      postID: comment.post_id
    })
  }

  return (
    <span>
      <FaRegTrashAlt className="style-delete" onClick={toggle} />

      <Modal
        open={modal}
        onClose={toggle}
        slots={{ backdrop: Backdrop }}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Box >
          <Typography id="transition-modal-title" variant="h6" component="h2" className="text-center">Delete Comment?</Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {currentState.commentsReducer.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Deleting...
              </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitDelete}
                type="submit"
              >
                Delete
              </button>
            )}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}

export default DeleteComment;
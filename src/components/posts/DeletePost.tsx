import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../types/hooks";

import { Button, Modal, Box, Typography } from "@mui/material"
import { FaRegTrashAlt } from 'react-icons/fa'

import { deletePost } from '../../store/modules/posts/actions'


const DeletePost = ({ postID }) => {
  const [modal, setModal] = useState(false);

  const dispatch = useAppDispatch()
  const currentState = useAppSelector((state) => state);
  const removePost = id => dispatch(deletePost(id))

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  }

  const submitDelete = (e) => {
    e.preventDefault()
    let id = postID
    removePost(id)
  }

  return (
    <span>
      <FaRegTrashAlt className="style-delete" onClick={toggle} />

      <Modal
        open={modal}
        onClose={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <Typography id="transition-modal-title" variant="h6" component="h2" className="text-center">
            Delete Post?
          </Typography>
          <div>
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
          </div>
        </Box>
      </Modal>
    </span>
  );
}

export default DeletePost;
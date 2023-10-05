import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../types/hooks";

import { Button, Modal, FormLabel, FormGroup, Typography, Box } from "@mui/material";
import { FaPencilAlt } from 'react-icons/fa'

import { updatePost } from '../../store/modules/posts/actions'

const EditPost = ({ post }) => {
  const [modal, setModal] = useState(false);
  const [postUpdate, setPostUpdate] = useState<any>("")

  const dispatch = useAppDispatch()
  const currentState = useAppSelector((state) => state);

  const authID = currentState.Auth.currentUser.id
  const theUpdate = details => dispatch(updatePost(details, updateSuccess))

  const updateSuccess = () => {
    setModal(!modal);
  }

  useEffect(() => {
    setPostUpdate(post)
  }, [post]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
    setPostUpdate(post)
  }

  const handleChange = e => {
    setPostUpdate({
      ...postUpdate,
      [e.target.name]: e.target.value
    })
  }

  const submitPost = (e) => {
    e.preventDefault()
    theUpdate({
      id: post.id,
      title: postUpdate.title,
      content: postUpdate.content,
      author_id: authID
    })
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle} />

      <Modal
        open={modal}
        onClose={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <Typography id="transition-modal-title" variant="h6" component="h2">Edit Post</Typography>
          <div>
            <FormGroup>
              <FormLabel>Title hello</FormLabel>
              <input className="form-control" type="text" name="title" defaultValue={postUpdate.title} onChange={handleChange} />
              {currentState.postsReducer.postsError && currentState.postsReducer.postsError.Required_title ? (
                <small className="color-red">{currentState.postsReducer.postsError.Required_title}</small>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Content</FormLabel>
              <textarea className="form-control" name="content" style={{ width: "100%", height: "150px" }} defaultValue={postUpdate.content} onChange={handleChange}></textarea>
              {currentState.postsReducer.postsError && currentState.postsReducer.postsError.Required_content ? (
                <small className="color-red">{currentState.postsReducer.postsError.Required_content}</small>
              ) : (
                ""
              )}
            </FormGroup>
          </div>
          <div>
            {currentState.postsReducer.isLoading ? (
              <button className="btn btn-primary"
                disabled
              >
                Updating...
              </button>
            ) : (
              <button className="btn btn-primary"
                onClick={submitPost}
                type="submit"
              >
                Update
              </button>
            )}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </span>
  );
}

export default EditPost;
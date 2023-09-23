import React from 'react'
import Moment from 'react-moment';

import {
  Card, CardContent, Typography, CardHeader
} from '@mui/material';

import '../posts/Posts.css';
import Default from '../../Assets/default.png'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'
import { useAppSelector } from '../../types/hooks';


const Comment = ({ comment }) => {

  const currentState = useAppSelector(state => state)
  const authID = currentState.Auth.currentUser.id

  let commentAvatar = comment.user.avatar_path

  let imagePreview = null
  if (commentAvatar) {
    imagePreview = (<img className="img_style_post" src={commentAvatar} alt="profile" />);
  } else {
    imagePreview = (<img className="img_style_post" src={Default} alt="profile" />);
  }

  return (
    <div className="mt-3">
      <Card>
        <CardHeader>
          {comment.user ?
            <span>
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span style={{ fontWeight: 'bold' }}>{comment.user.username}</span>
              </span>
              <span style={{ float: 'right' }}>
                <Moment fromNow>
                  {comment.created_at}
                </Moment>
              </span>
            </span>
            : ""}
        </CardHeader>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment.body}
          </Typography>
        </CardContent>
        {authID === comment.user.id ? (
          <div style={{ float: "right" }}>
            <span style={{ marginRight: "20px" }}>
              <EditComment comment={comment} />
            </span>
            <span>
              <DeleteComment comment={comment} />
            </span>
          </div>
        ) : ""}
      </Card>
    </div>
  )
}

export default Comment
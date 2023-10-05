import React from 'react'
import Moment from 'react-moment';
import { Card, CardHeader, CardContent, Typography } from "@mui/material"
import { useAppSelector } from "../../types/hooks";

import './Posts.css';
import Default from '../../Assets/default.png'
import Likes from '../likes/Likes'
import Comments from '../comments/Comments'
import EditPost from './EditPost';
import DeletePost from './DeletePost'



const AuthPost = ({ post }) => {

  const currentState = useAppSelector(state => state)
  const authID = currentState.Auth.currentUser.id

  let $imagePreview = null;
  if (post.author.avatar_path) {
    $imagePreview = (<img className="img_style_post" src={post.author.avatar_path} alt="no one" />);
  } else {
    $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2" />);
  }

  return (
    <Card className="style-card-main">
      <CardHeader>
        <span>
          <span className="mr-2">
            {$imagePreview}
          </span>
          <span style={{ fontWeight: 'bold' }}>{post.author.username}</span>
        </span>
        <span style={{ float: 'right' }}>
          <Moment fromNow>{post.created_at}</Moment>
        </span>
      </CardHeader>
      <Typography>{post.title}</Typography>
      <CardContent className="style-card-body">{post.content}</CardContent>
      <div className="style-fav">
        {authID ? (
          <>
            <Likes postID={post.id} />
            <Comments postID={post.id} />
          </>
        ) : ""}
        {authID === post.author_id ? (
          <div className="ml-auto">
            <span style={{ marginRight: "20px" }}>
              <EditPost post={post} />
            </span>
            <span>
              <DeletePost postID={post.id} />
            </span>
          </div>
        ) : ""}
      </div>
    </Card>
  )
}

export default AuthPost
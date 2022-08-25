import React, { useState } from 'react';
import Moment from 'react-moment';
import { Card, CardHeader, IconButton, Avatar, Typography, Box } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';

import { deletePost } from '../../store/modules/posts/actions';
import DialogDelete from "../utils/DialogDelete";
import { useAppDispatch, useAppSelector } from '../../types/hooks';

import './Posts.css';
import Default from '../../Assets/default.png';


const Post = ({ post }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const currentState = useAppSelector(state => state.Auth)
    const authID = currentState.currentUser ? currentState.currentUser.id : "";
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deletePost(post.id))
    };

    let $imagePreview = null;
    if (post.author.avatar_path) {
        $imagePreview = (<img className="img_style_post" src={post.author.avatar_path} alt="no one" />);
    } else {
        $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2" />);
    }

    return (
        <Card variant="elevation" sx={{ maxWidth: 600, width: "100%" }}>
            <CardHeader title={
                <Typography variant="h4">
                    <Link className="outside-link" to={"#"}>{post.name}</Link>
                </Typography>
            }
                subheader={
                    <Typography>
                        Subheader
                    </Typography>
                }
                action={
                    <Box>
                        <IconButton onClick={() => setOpenDialog(true)}>
                            <DeleteOutlined />
                        </IconButton>
                        <DialogDelete
                            open={openDialog}
                            handleClose={() => setOpenDialog(false)}
                            handleDelete={() => handleDelete()}
                        />

                    </Box>
                } />
        </Card>
    )
}

export default Post
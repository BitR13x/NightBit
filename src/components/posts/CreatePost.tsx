import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { Button, TextField } from "@mui/material";

import { createPost } from '../../store/modules/posts/actions';

import { Container } from "@mui/system";
import MUIRichTextEditor from 'mui-rte'
import { EditorState, convertToRaw } from "draft-js";

import "./Posts.css";


const CreatePost = () => {
    //? when called setState editorstate will be empty
    let editorstate = EditorState.createEmpty();
    const currentState = useAppSelector((state) => state.Auth);
    const TitleField = React.useRef<HTMLInputElement>();

    const dispatch = useAppDispatch();
    const addPost = (postDetails) => dispatch(createPost(postDetails));

    const submitUser = (e) => {
        e.preventDefault()
        let ContentState = editorstate.getCurrentContent();
        if (TitleField.current.value.length > 3 || ContentState.hasText()) {
            return;
        } else {
            addPost({
                title: TitleField.current.value,
                content: convertToRaw(ContentState),
            });
        };
    };

    /* { content && console.log(convertToRaw(content.getCurrentContent())) } */
    /*     if (!currentState.isAuthenticated) {
            return <Navigate to='/login' />
        }; */
    return (
        <div className="App">
            <div className="post-content">
                <Container>
                    <div className="centerMe">
                        <TextField
                            fullWidth
                            inputRef={TitleField}
                            label="Title of the post"
                            variant="outlined"
                            sx={{ maxWidth: 600, width: "100%" }}
                        />
                    </div>
                    <div className="content">
                        <MUIRichTextEditor
                            /* //? missing link */
                            controls={["title", "bold", "italic", "underline", "strikethrough", "highlight",
                                "undo", "redo", "numberList", "bulletList", "quote", "code", "clear"]}
                            maxLength={9999}
                            label="Start typing..."
                            //@ts-ignore
                            onChange={(value) => { editorstate = value }}
                        />
                    </div>

                    <div className="centerMe">
                        <Button variant="contained" sx={{ maxWidth: 600, width: "100%", marginTop: "20vh" }} onClick={submitUser}>
                            Submit
                        </Button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default CreatePost

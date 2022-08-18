import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/reducer";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    /* PostsState: postsState, */
    /* LikesState: likesState, */
    /* CommentsState: commentsState */
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;


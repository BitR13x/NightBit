import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/reducer";
import postsReducer from "./modules/posts/reducer";
import likesReducer from "./modules/likes/reducer";
import commentsReducer from "./modules/comments/reducer";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    postsReducer: postsReducer,
    likesReducer: likesReducer,
    commentsReducer: commentsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

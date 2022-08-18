import { SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR,
         LOGOUT_SUCCESS, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, 
         UPDATE_USER_ERROR, BEFORE_STATE, UPDATE_USER_AVATAR_ERROR, 
         BEFORE_AVATAR_STATE, BEFORE_USER_STATE, FORGOT_PASSWORD_SUCCESS, 
         FORGOT_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, 
         DELETE_USER_SUCCESS, DELETE_USER_ERROR  } from './authTypes'
import setAuthorizationToken  from "../../../authorization/authorization";
import API_ROUTE from "../../../apiRoute";
import { history } from '../../../history';

import { createSlice } from "@reduxjs/toolkit";
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';


export const initState = {
    isAuthenticated: false,
    currentUser: {},
    isLoading: false,
    isLoadingAvatar: false,
    isUpdatingUser: false,
    authError: null,
    authSuccess: null
};

const authReducer = createSlice({
    name: "Auth",
    initialState: initState,
    reducers: {
        SignIn: (state, action) => {
            state = returnStateByActionType(state, { type: BEFORE_STATE })
            axios.post(`${API_ROUTE}/login`, action.payload.credentials)
                 .then((res) => {
                    let userData = res.data.response;
                    localStorage.setItem("token", userData.token);
                    localStorage.setItem('user_data', JSON.stringify(userData));
                    setAuthorizationToken(userData.token);
                    state = returnStateByActionType(state, { type: LOGIN_SUCCESS, payload: res.data.response });
                }, (err) => {
                  if (err.response.data) {
                    state = returnStateByActionType(state, { type: LOGIN_ERROR, payload: err.response.data.error });
                  } else {
                    state = returnStateByActionType(state, { type: LOGIN_ERROR, payload: err.message });
                  };
                });
        },
        SignOut: (state, _) => {
            localStorage.removeItem("token");
            setAuthorizationToken(false);
            state = returnStateByActionType(state, { type: LOGOUT_SUCCESS });
            window.localStorage.clear();
            history.push('/login');
        },
        SignUp: (state, action) => {
            state = returnStateByActionType(state, { type: BEFORE_STATE });
            axios.post(`${API_ROUTE}/register`, action.payload.newUser)
                 .then(() => {
                    state = returnStateByActionType(state, { type: SIGNUP_SUCCESS });
                    history.push("/login");
                 }, (err) => {
                    if (err.response.data) {
                      state = returnStateByActionType(state, { type: SIGNUP_ERROR, payload: err.response.data.error });
                    } else {
                      state = returnStateByActionType(state, { type: SIGNUP_ERROR, payload: err.message });
                    };
                 });
        },
        updateUserAvatar: (state, action) => {
            state = returnStateByActionType(state, { type: BEFORE_AVATAR_STATE });
            if (!isEmpty(state.currentUser)) {
                try {
                    //@ts-ignore
                    axios.put(`${API_ROUTE}/avatar/users/${state.currentUser?.id}`, action.payload.updateUserAvatar, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        },
                    }).then((res) => {
                        let updatedUser = res.data.response
                        window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorage
                        state = returnStateByActionType(state, { type: UPDATE_USER_AVATAR, payload: updatedUser });
                    });
                } catch(err) {
                    state = returnStateByActionType(state, { type: UPDATE_USER_AVATAR_ERROR, payload: err.response.data.error });
                }
            } else {
                state = returnStateByActionType(state, { type: UPDATE_USER_AVATAR_ERROR, payload: "You must login fist!" });
            }
        }
    }
});

export const { SignIn, SignOut, SignUp, updateUserAvatar } = authReducer.actions;
export default authReducer.reducer;


const returnStateByActionType = (state, action) => {
  switch(action.type) {
    // This is the state to set when the button is click and we are waiting for response 
    case BEFORE_STATE:
      return {
        ...state,
        authError: null,
        isLoading: true,
      }
    case BEFORE_AVATAR_STATE:
        return {
          ...state,
          avatarError: null,
          isLoadingAvatar: true,
        }
    case BEFORE_USER_STATE:
      return {
        ...state,
        userError: null,
        isUpdatingUser: true,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signupError: null,
        loginError: null

      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        signupError: action.payload,
        loginError: null

      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loginError: null,
        signupError: null,

      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loginError: action.payload,
        signupError: null,

      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        logoutError: null,
        isLoading: false,
        signupError: null,
        loginError: null,
      }
      
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        isLoadingAvatar: false,
        currentUser: action.payload,
        avatarError: null,
        authSuccessImage: "Image Uploaded"
      }
    case UPDATE_USER_AVATAR_ERROR:
        return {
          ...state,
          isLoadingAvatar: false,
          avatarError: action.payload,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        currentUser: action.payload,
        userError: null,
        authSuccessUser: "Details Updated"
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isUpdatingUser: false,
        userError: action.payload
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
        isLoading: false,
        authSuccessUser: "User Deleted"
      }
    case DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userError: action.payload
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        forgotError: null,
        successMessage: "Mesage sent to the email provided. Please check the spam folder"
      }
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        forgotError: action.payload
      }
      case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resetError: null,
        successMessage: "Success! Password Reset" 
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        resetError: action.payload
      }
    default:
      return state;
  }
}
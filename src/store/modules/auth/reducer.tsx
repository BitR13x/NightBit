import {
  SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT_SUCCESS, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR, BEFORE_STATE, UPDATE_USER_AVATAR_ERROR,
  BEFORE_AVATAR_STATE, BEFORE_USER_STATE, FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
  DELETE_USER_SUCCESS, DELETE_USER_ERROR
} from './authTypes'
import isEmpty from 'lodash/isEmpty';

export const initState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  isLoadingAvatar: false,
  isUpdatingUser: false,
  authSuccess: null,
  avatarError: null,
  userError: null,
  signupError: null,
  loginError: null,
  forgotError: null,
  resetError: null,
  successMessage: null,
  authSuccessImage: null,
  authSuccessUser: null
}

const authReducer = (state = initState, { payload, type }) => {
  switch (type) {
    case BEFORE_STATE:
      return {
        ...state,
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
        signupError: payload,
        loginError: null

      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
        isAuthenticated: !isEmpty(payload),
        loginError: null,
        signupError: null,

      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loginError: payload,
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
        currentUser: payload,
        avatarError: null,
        authSuccessImage: "Image Uploaded"
      }
    case UPDATE_USER_AVATAR_ERROR:
      return {
        ...state,
        isLoadingAvatar: false,
        avatarError: payload,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        currentUser: payload,
        userError: null,
        authSuccessUser: "Details Updated"
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isUpdatingUser: false,
        userError: payload
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
        userError: payload
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
        forgotError: payload
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
        resetError: payload
      }
    default:
      return state;
  }
}

export default authReducer
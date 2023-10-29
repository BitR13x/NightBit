import axios from "axios";
import setupAxios from "../../../../authorization/authorization";
import {
  SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR,
  LOGOUT_SUCCESS, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR, BEFORE_STATE, UPDATE_USER_AVATAR_ERROR,
  BEFORE_AVATAR_STATE, BEFORE_USER_STATE, FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
  DELETE_USER_SUCCESS, DELETE_USER_ERROR
} from '../authTypes'
import API_ROUTE from "../../../../apiRoute";
import { history } from '../../../../history';
// from store import
import { AppDispatch } from "../../..";

export const SignIn = (credentials: { email: string, password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: BEFORE_STATE });
    axios.post(`${API_ROUTE}/login`, credentials)
      .then((res) => {
        let userData = res.data;

        localStorage.setItem("isLogged", userData.auth);
        localStorage.setItem('user_data', JSON.stringify(userData.user));

        setupAxios(userData.auth);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
        history.push("/");
      }, (err) => {
        if (err.response) {
          dispatch({ type: LOGIN_ERROR, payload: err.response.data.error });
        } else {
          dispatch({ type: LOGIN_ERROR, payload: err.message });
        };
      });
  };
};

export const SignOut = () => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("isLogged");
    setupAxios(false);
    dispatch({ type: LOGOUT_SUCCESS });
    window.localStorage.clear();
    history.push('/login');
  };
};

export const SignUp = (newUser: { username: string, email: string, password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: BEFORE_STATE });
    axios.post(`${API_ROUTE}/register`, newUser)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        history.push("/login");
      }, (err) => {
        if (err.response) {
          dispatch({ type: SIGNUP_ERROR, payload: err.response.data.error });
        } else {
          dispatch({ type: SIGNUP_ERROR, payload: err.message });
        };
      });
  };
};

export const updateUserAvatar = (updateUserAvatar) => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch({ type: BEFORE_AVATAR_STATE });
    const { id } = getState().Auth.currentUser;
    try {
      const res = await axios.put(`${API_ROUTE}/avatar/users/${id}`, updateUserAvatar, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      let updatedUser = res.data
      window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorage
      dispatch({ type: UPDATE_USER_AVATAR, payload: updatedUser });
    } catch (err) {
      dispatch({ type: UPDATE_USER_AVATAR_ERROR, payload: err.response.data.error });
    };
  };
};

export const updateUser = (updateUser, clearInput) => {
  return async (dispatch, getState) => {
    dispatch({ type: BEFORE_USER_STATE });
    const { currentUser } = getState().Auth;
    try {
      const res = await axios.put(`${API_ROUTE}/users/${currentUser.id}`, updateUser);
      let updatedUser = res.data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser })
      window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorages
      clearInput();
    } catch (err) {
      dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error });
    };
  };
};

export const deleteUser = (id) => {
  return async dispatch => {
    dispatch({ type: BEFORE_STATE });
    try {
      const res = await axios.delete(`${API_ROUTE}/users/${id}`);
      let deleteMessage = res.data;
      dispatch({ type: DELETE_USER_SUCCESS, payload: deleteMessage });
      window.localStorage.clear(); //update the localstorage
      window.location.href = "/";
    } catch (err) {
      if (err.response) {
        dispatch({ type: DELETE_USER_ERROR, payload: err.response.data.error });
      } else {
        dispatch({ type: DELETE_USER_ERROR, payload: err.response.message });
      }
    };
  };
};


export const ForgotPassword = (userEmail: string, clearInput) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE });
    try {
      const res = await axios.post(`${API_ROUTE}/password/forgot`, userEmail);
      let passwordRequest = res.data;
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: passwordRequest });
      clearInput();
    } catch (err) {
      if (err.response.data.error) {
        dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response.data.error });
      } else {
        dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response.message });
      }
    };
  };
};

export const ResetPassword = (details, clearInput) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE });
    try {
      const res = await axios.post(`${API_ROUTE}/password/reset`, details);
      let passwordRequest = res.data;
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: passwordRequest });
      clearInput();
    } catch (err) {
      if (err.response.data.error) {
        dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.data.error });
      } else {
        dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.message });
      }
    };
  };
};

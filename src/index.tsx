import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from "react-redux";

import RoutesPaths from './Routes';
import * as serviceWorker from './serviceWorker';
import setupAxios from './authorization/authorization';

import store from './store/index';
import { LOGIN_SUCCESS } from './store/modules/auth/authTypes';

import './index.css';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#311b92",
      contrastText: '#fff'
    },
    secondary: {
      main: '#1e88e5',
      contrastText: '#fff'
    }
  }
});

//when the page reloads, the auth user is still set
if (localStorage.isLogged) {
  setupAxios(localStorage.isLogged)
  let userData = localStorage.getItem('user_data') == null ? null : JSON.parse(localStorage.getItem('user_data'))
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData }) //provided he has a valid token 
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RoutesPaths />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

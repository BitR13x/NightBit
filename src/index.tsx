import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesPaths from './Routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import './index.css'
import store from './store/index'
import setAuthorizationToken  from './authorization/authorization';
import { LOGIN_SUCCESS } from './store/modules/auth/authTypes';

//when the page reloads, the auth user is still set
if (localStorage.token){
  setAuthorizationToken(localStorage.token) 
  let userData = localStorage.getItem('user_data') == null ? null : JSON.parse(localStorage.getItem('user_data'))
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData}) //provided he has a valid token 
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RoutesPaths />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

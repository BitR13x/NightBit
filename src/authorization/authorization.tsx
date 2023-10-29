import axios from 'axios';

export default function setupAxios(isLogged: boolean) {
  axios.defaults.withCredentials = isLogged;
};



import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import "./Auth.css";
import { SignUp } from "../../store/modules/auth/reducer";


const Register = () => {

  const currentState = useAppSelector((state) => state.Auth);
  const [user, setUser] = useState({
    username:'',
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addUser({
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Navigate replace to='/' />
  }

    return (
      <div className="App" id="page-container">
        <div></div>
      </div>
    );
}

export default Register

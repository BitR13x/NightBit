import React, { useState } from "react";
import { Input, FormGroup, Button, Card, CardHeader, Typography } from "@mui/material";
import { Link, Navigate } from 'react-router-dom';

import { ResetPassword } from "../../store/modules/auth/actions";
import Navigation from '../Navigation'
import Message from '../utils/Message';
import { useAppDispatch, useAppSelector } from "../../types/hooks";



const PasswordReset = ({ reset_token }) => {

  const currentState = useAppSelector((state) => state.Auth);
  const [resetDetails, setResetDetails] = useState({
    token: reset_token,
    new_password: '',
    retype_password: ''
  });

  const dispatch = useAppDispatch();
  const resetPass = (details) => dispatch(ResetPassword(details, clearInput))
  const [showLogin, setShowLogin] = useState(false)

  const clearInput = () => {
    setShowLogin(true)
    setResetDetails({
      token: '',
      new_password: '',
      retype_password: ''
    })
  }

  const handleChange = e => {
    setResetDetails({
      ...resetDetails,
      [e.target.name]: e.target.value
    })
  }

  const submitRequest = (e) => {
    e.preventDefault()
    resetPass({
      token: resetDetails.token,
      new_password: resetDetails.new_password,
      retype_password: resetDetails.retype_password
    });
  }

  if (currentState.isAuthenticated) {
    return <Navigate replace to='/' />
  }

  return (
    <div className="App" id="page-container">
      <div>
        <Navigation />
      </div>
      <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Reset Password</CardHeader>
          <div>
            <FormGroup>
              {currentState.successMessage != null && currentState.resetError == null ? (
                <span>
                  <Message msg={currentState.successMessage} />
                </span>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              {currentState.resetError && currentState.resetError.Invalid_token ? (
                <span>
                  <small className="color-red">{currentState.resetError.Invalid_token}</small>
                  <small className="ml-2"><Link to="/forgotpassword">here </Link></small>
                </span>
              ) : (
                ""
              )}
              {currentState.resetError && currentState.resetError.Empty_passwords ? (
                <small className="color-red">{currentState.resetError.Empty_passwords}</small>
              ) : (
                ""
              )}
              {currentState.resetError && currentState.resetError.Invalid_Passwords ? (
                <small className="color-red">{currentState.resetError.Invalid_Passwords}</small>
              ) : (
                ""
              )}
              {currentState.resetError && currentState.resetError.Password_unequal ? (
                <small className="color-red">{currentState.resetError.Password_unequal}</small>
              ) : (
                ""
              )}
            </FormGroup>

            {showLogin ? (
              <a href="/login" className="btn btn-primary form-control"
              >
                Login
              </a>
            ) : (
              <form onSubmit={submitRequest}>
                <FormGroup>
                  <Typography>New Password</Typography>
                  <Input type="password" name="new_password" value={resetDetails.new_password} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Typography>Retype Password</Typography>
                  <Input type="password" name="retype_password" value={resetDetails.retype_password} onChange={handleChange} />
                </FormGroup>
                {currentState.isLoading ? (
                  <Button
                    color="primary"
                    variant="outlined"
                    disabled
                  >
                    Reseting...
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={resetDetails.new_password === "" || resetDetails.retype_password === ""}
                  >
                    Save Password
                  </Button>
                )}
              </form>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}

export default PasswordReset

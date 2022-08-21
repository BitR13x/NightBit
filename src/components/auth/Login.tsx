import React, { useState } from "react";

import {
  TextField, Button, Grid, Box, Typography,
  InputAdornment, Backdrop,
  CircularProgress, IconButton
} from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility } from '@mui/icons-material';

import { Link, Navigate } from 'react-router-dom';
import { SignIn } from "../../store/modules/auth/actions";
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import AlertUtil from "../utils/AlertUtil";
import "./Auth.css";


const Login = () => {
  const EmailFied = React.useRef<HTMLInputElement>();
  const PasswdField = React.useRef<HTMLInputElement>();
  const currentState = useAppSelector((state) => state.Auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [labelEmail, setLabelEmail] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const dispatch = useAppDispatch();
  const userLogin = (credentials: { email: string, password: string }) => dispatch(SignIn(credentials));

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChangeEmail = (e) => {
    if (isValidEmail(e.target.value)) {
      setLabelEmail("");
    } else {
      setLabelEmail("Please use valid email");
    };
  };

  const submitUser = () => {
    if (EmailFied.current.value.length < 3 || PasswdField.current.value.length < 3) {
      setIsEmptyField(true);
      return;
    } else {
      if (isEmptyField) setIsEmptyField(false);
    };
    userLogin({
      email: EmailFied.current.value,
      password: PasswdField.current.value
    });
  };

  if (currentState.isAuthenticated) {
    return <Navigate replace to='/' />
  };

  return (
    <div className="App">
      {currentState.loginError && <AlertUtil msg={currentState.loginError} />}
      <div className="Main">
        <div className="FormMain">
          <Typography variant="h4" color="white">
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" color="white">
            We're happy to see you again.
          </Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                width: 350,
                maxWidth: '100%',
              }}>
                <TextField error={currentState.loginError ? true : false || isEmptyField} fullWidth inputRef={EmailFied} color="secondary" label="Email"
                  variant="filled" margin="dense" InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }} onChange={handleChangeEmail} helperText={labelEmail} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                width: 350,
                maxWidth: '100%',
              }}>
                <TextField error={currentState.loginError ? true : false || isEmptyField} fullWidth type={showPassword ? "text" : "password"} inputRef={PasswdField} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitUser();
                  }
                }} helperText={isEmptyField ? "Please fill everything out." : ""}
                  color="secondary" label="Password"
                  variant="filled" margin="dense" InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Password />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button sx={{ width: 350, maxWidth: '100%' }}
                variant="contained" color="primary" onClick={submitUser}>
                Login
              </Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={currentState.isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <div className="outside-link-container" style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <small><Link className="outside-link" to="/signup">Sign Up</Link></small>
                </div>
                <div>
                  <small><Link className="outside-link" to="/forgotpassword">Forgot Password?</Link></small>
                </div>
              </div>

            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
}

export default Login


import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import {
  TextField, Button, Grid, Box, Typography,
  InputAdornment, Backdrop, CircularProgress, IconButton
} from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility, EmailOutlined } from '@mui/icons-material';


import { useAppSelector, useAppDispatch } from "../../types/hooks";
import "./Auth.css";
import { SignUp } from "../../store/modules/auth/actions";
import AlertUtil from "../utils/AlertUtil";

const Register = () => {
  const EmailField = React.useRef<HTMLInputElement>();
  const UserField = React.useRef<HTMLInputElement>();
  const PasswdField = React.useRef<HTMLInputElement>();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [labelEmail, setLabelEmail] = useState("");

  const currentState = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();

  const addUser = (credentials: { username: string, email: string, password: string }) => dispatch(SignUp(credentials));

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
    if (EmailField.current.value.length < 3 || UserField.current.value.length < 3 || PasswdField.current.value.length < 3) {
      setIsEmptyField(true);
      return;
    } else {
      if (isEmptyField) setIsEmptyField(false);
    };
    addUser({
      username: UserField.current.value,
      email: EmailField.current.value,
      password: PasswdField.current.value
    });
  };

  if (currentState.isAuthenticated) {
    return <Navigate replace to='/' />
  };

  return (
    <div className="App">
      {currentState.signupError && <AlertUtil msg={currentState.signupError} />}
      <div className="Main">
        <div className="FormMain">
          <Typography variant="h4" color="#fff">
            Create an account
          </Typography>
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                width: 350,
                maxWidth: '100%',
              }}>
                <TextField fullWidth inputRef={EmailField} color="secondary" label="Email"
                  variant="filled" margin="dense" InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    )
                  }} onChange={handleChangeEmail} helperText={labelEmail} />
                <TextField fullWidth type="text" inputRef={UserField} color="secondary" label="Username"
                  variant="filled" margin="dense" InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                width: 350,
                maxWidth: '100%',
              }}>

                <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={PasswdField} color="secondary" label="Password"
                  variant="filled" margin="dense" helperText="Choose strong password." onKeyDown={e => { if (e.key === "Enter") { submitUser(); } }}
                  InputProps={{
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
              <div style={{ marginTop: "2vh" }}></div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button sx={{ width: 350, maxWidth: '100%' }}
                variant="contained" color="primary" onClick={submitUser}>
                Register
              </Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={currentState.isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <div className="outside-link-container">
                <Link to="/login" className="outside-link">Already have an account?</Link>
              </div>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
}

export default Register

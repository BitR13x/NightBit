import React, { useState } from "react";

import { TextField, Button, Grid, Box, Typography,
  InputAdornment, Backdrop, 
  CircularProgress, IconButton } from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility } from '@mui/icons-material';

import { Link, Navigate } from 'react-router-dom';
import { SignIn } from "../../store/modules/auth/reducer";
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import "./Auth.css";


const Login = () => {
  const UserField = React.useRef<HTMLInputElement>();
  const PasswdField = React.useRef<HTMLInputElement>();

  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const currentState = useAppSelector((state) => state.Auth);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({})
  const dispatch = useAppDispatch()
  const userLogin = (credentials) => dispatch(SignIn(credentials))


  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  
  const submitUser = () => {
    if (UserField.current.value.length < 3 || PasswdField.current.value.length < 3) {
      return;
    }
    setOpenBackDrop(true);
    userLogin({
      email: UserField.current.value,
      password: PasswdField.current.value
    });
  }

  if(currentState.isAuthenticated){
    return <Navigate replace to='/' />
  }
  console.log(currentState)
    return (
      <div className="App">
{/*       <Container>
          <div className="alertContainer">
              { (alert && alert.message) &&
              // @ts-ignore
              <Alert sx={{ width: 600 }} severity="warning">{alert.message}</Alert>}
          </div>
      </Container> */}
      <div className="Main">
          <div className="LoginMain">
              <Typography variant="h4">
                  Welcome Back!
              </Typography>
              <Typography variant="subtitle1">
                  We're happy to see you again.
              </Typography>
              <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{
                              width: 350,
                              maxWidth: '100%',
                          }}>
                          <TextField fullWidth inputRef={UserField} id="outlined-name" color="secondary" label="Username"
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
                          <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={PasswdField} onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                submitUser();
                              }
                          }} 
                          id="outlined-name" color="secondary" label="Password"
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
                        open={openBackDrop}
                      >
                          <CircularProgress color="inherit" />
                      </Backdrop>
                      <div className="outside-link-container" style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                          <small><Link to="/signup">Sign Up</Link></small>
                        </div>
                        <div>
                          <small><Link to="/forgotpassword">Forgot Password?</Link></small>
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


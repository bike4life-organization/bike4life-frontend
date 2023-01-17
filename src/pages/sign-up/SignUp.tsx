import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"
import {useState} from 'react';
import '../../styles/message.scss'


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Bike4Life
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [message, setMessage] = useState <string | null>("") 
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const navigate = useNavigate();


  const submitSignUp = (user: any) => {
    fetch(`${process.env.REACT_APP_AUTH_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status === 201) {
        toast.success('User created', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/')
      } else if (res.status === 409) {
        toast.warn('User already exists', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    });
  };
  
  const validateForm =(form: any)=>{
    let isError = false
    let errors = {
      name: ""
    }
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
    if(!form.username.trim()){
      errors.name = "User name can`t be empty"
      isError = true
    }

    if(!form.password.trim()){
      errors.name = "Password name can`t be empty"
      isError = true
    }else if(form.password.length < 8){
      errors.name = "Password must have at least 8 characters"
      isError = true
    }

    if(!form.firstName.trim()){
      errors.name = "First Name can`t be empty"
      isError = true
    }else if(!regexName.test(form.firstName)){
      errors.name = "Username only accepts letters and spaces"
      isError = true
    }
    if(!form.email.trim()){
      errors.name = "Email name can`t be empty"
      isError = true
    }else if(!regexEmail.test(form.email)){
      errors.name = "Email incorrect"
      isError = true
    }
    return isError ? errors.name : null
  } 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
    };
    if(validateForm(user) !== null){
      setError(true)
      setMessage(validateForm(user))
      return
    }
    setError(false)
    submitSignUp(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '10vh',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value= {firstName}
                  onChange={(e: any)=>{setFirstName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value= {username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value= {email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                   value= {password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
              <div className={`message-container`}>
               {error && <p className='error'>{message}</p>}
              </div>
             </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
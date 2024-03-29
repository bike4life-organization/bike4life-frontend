import React,{useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import useUser from '../../helpers/useUser';
import { UserContext } from '../../context/user/UserContext';
import { useEffect } from 'react';


function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Bike4Life
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [login, setLogin] = useState(false)
  const [message, setMessage] = useState <string | null>("")
  const [error, setError] = useState(false)
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const {loggin, isLoggedIn, loggout} = useUser( )
  const {setToken} = useContext(UserContext)

useEffect(() => {
  setLogin(isLoggedIn)
}, [isLoggedIn])

const validateForm =(form: any)=>{
  let isError = false
  let errors = {
    name: ""
  }
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;


  if(!form.password.trim()){
    errors.name = "Password name can`t be empty"
    isError = true
  }else if(form.password.length < 8){
    errors.name = "Password must have at least 8 characters"
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
    let data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    }
    if(validateForm(user) !== null){
      setError(true)
      setMessage(validateForm(user))
      return
    }
    setError(false)
    loggin(user.email, user.password)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={mail}
              onChange = {e=>setMail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange = {e=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className={`message-container`}>
               {error && <p className={'error'}>{message}</p>}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div style={{textAlign: "right"}}>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {isLoggedIn && (
          <Navigate to="/create-route" replace={true} />
        )}
    </ThemeProvider>
  );
}
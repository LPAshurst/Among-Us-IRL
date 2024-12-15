import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { recreateSocket } from "../socket";
import Navbar from '../ui/navbar';
import "../styles/signup-login.css"
import { useEffect } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  marginTop: "100px",
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  top: "0px",
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn() {
  const [userError, setuserError] = React.useState(false);
  const [usernameErrorMessage, setusernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (localStorage.getItem("logged_in") != null) {
      navigate("/join-create");
    }
    window.scrollTo(0, 0);
    console.log(import.meta.env.VITE_API_URL);

  }, []);
    
  async function validateInputs() {
    const user = document.getElementById('user') as HTMLInputElement;
    const pass = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (user.value.length == 0 || user.value.length > 15) {
      setuserError(true);
      setusernameErrorMessage('The username you entered doesnt have the correct format. It should be at least 1 character and at most 15'); 
      isValid = false;
    } else {
      setuserError(false);
      setusernameErrorMessage('');
    }

    if (pass.value.length == 0 || pass.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('The password format isnt correct. Passwords need to be longer than 6 characters');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!isValid) {
      return false;
    }

    // The code before this validates the input and then we check to see if the password/username is correct from here

    const response = await fetch(import.meta.env.VITE_API_URL + "api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.value, password: pass.value }),
    });

    if (!response.ok) {
      setuserError(true);
      setusernameErrorMessage('This username might be incorrect'); 
      setPasswordError(true);
      setPasswordErrorMessage('This password might be incorrect');
      return false;
    }

    const data = await response.json();
    if (data) {
      localStorage.setItem("logged_in", data);
      recreateSocket();
      navigate("/join-create", {state: user.value});
    } else {
      window.alert("Fatal error when trying to login. My bad gang....")
    }
    
    return isValid;
  };

  return (
    <>
      <Navbar />
      <main className="login-signup-screen">
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel >User Name</FormLabel>
                <TextField
                  error={userError}
                  helperText={usernameErrorMessage}
                  id="user"
                  type="text"
                  name="user"
                  placeholder="yourusername"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={userError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Log in
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                <Link to={"/signup"}>sign up</Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </main>
    </>
  );
}
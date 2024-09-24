import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import ErrorPage from "./errors/error-page";
import LoginPage from './routes/login.tsx';
import SignUpPage from './routes/signup.tsx';
import JoinPage from './routes/game-join.tsx';
import CreationPage from './routes/game-create.tsx';
import TaskScreen from './routes/task-screen.tsx';
import TaskCopy from './routes/task-screen copy.tsx';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignUpPage />
    },
    {
      path: "join-create",
      element: <JoinPage />
    },
    {
      path: "create-game",
      element: <CreationPage />
    },
    {
      path: "copy",
      element: <TaskCopy />
    },
    {
      path: "game-page",
      element: <TaskScreen />
    }
  ]
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A',
    },
    secondary: {
      main: '#66aee8',
    },
  },
  typography: {
    fontFamily: [
      'Lusitana',
      'Comfortaa',
    ].join(','),
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: 'header' },
          style: {
            color: 'black',
            backgroundColor: '#66aee8',
            borderRadius: '20px',
            fontWeight: 700
          }
        }
      ]
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
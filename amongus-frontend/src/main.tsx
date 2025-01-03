import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createHashRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import ErrorPage from "./errors/error-page";
import LoginPage from './routes/login.tsx';
import SignUpPage from './routes/signup.tsx';
import JoinPage from './routes/game-join.tsx';
import CreationPage from './routes/game-create.tsx';
import TaskScreen from './routes/task-screen.tsx';
import Report from './routes/report.tsx';
import WaitingRoom from './routes/waiting-room.tsx';
import SurveyForm from './routes/survey.jsx';
import AdminConsole from './routes/admin-console.tsx';

const router = createHashRouter(
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
      path: "game/:room",
      element: <TaskScreen />
    },
    {
      path: "report",
      element: <Report />
    },
    {
      path: "waiting-room",
      element: <WaitingRoom />
    },
    {
      path: "survey",
      element: <SurveyForm />
    },
    {
      path: "admin-console/:room",
      element: <AdminConsole />
    }
  ]
);
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    header: true;
  }
}
declare module '@mui/material/IconButton' {
  interface ButtonPropsVariantOverrides {
    remove: true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A',
    },
    secondary: {
      main: '#66aee8',
    },
  },
});
theme = createTheme(theme, {
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
          props: { variant: 'header' },
          style: {
            color: 'black',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '20px',
            fontWeight: 700
          }
        },
      ]
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: 'remove' },
          style: {
            color: 'white',
            backgroundColor: theme.palette.error.main,
            minWidth: 20,
            width: 20,
            minHeight: 20,
            height: 20,
          },
        }
      ]
    },
    MuiTableCell: {
      variants: [
        {
          props: { variant: 'head' },
          style: {
            backgroundColor: theme.palette.grey[400],
            fontSize: "1.4em",
            fontWeight: 600,
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
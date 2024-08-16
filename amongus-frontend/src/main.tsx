import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';


import ErrorPage from "./errors/error-page";
import LoginPage from './routes/login.tsx';
import SignUpPage from './routes/signup.tsx';
import JoinPage from './routes/game-join.tsx';
import CreationPage from './routes/game-create.tsx';


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
  }
]
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
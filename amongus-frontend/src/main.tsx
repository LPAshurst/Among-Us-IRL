import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';

import ErrorPage from "./errors/error-page";
import TaskScreen from './routes/task-screen.tsx';

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "task-screen",
    element: <TaskScreen />,
    errorElement: <ErrorPage />
  }
]
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)

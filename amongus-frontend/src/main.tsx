import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';

import ErrorPage from "./errors/error-page";
import LoginPage from './routes/login.tsx';
import SignUpPage from './routes/signup.tsx';

function Main() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            errorElement={<ErrorPage  />}
            element={<App />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Main />
  </React.StrictMode>,
)
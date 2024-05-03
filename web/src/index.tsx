import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Login } from './page/LoginUser';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <App/>
   </BrowserRouter>
   </AuthProvider>
  </React.StrictMode>
);


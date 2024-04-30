import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './page/LoginUser';
import ClientForm from './page/ClientForm';
import { Cliente } from './page/cliente';
import { RequireAuth } from './context/RequireAuth';
import  "../src/assets/styles/global.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/cadastro" element={<RequireAuth><ClientForm/></RequireAuth>} />
        <Route path="/cliente" element={<RequireAuth><Cliente/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;

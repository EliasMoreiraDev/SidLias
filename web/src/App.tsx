import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './page/LoginUser';
import ClientForm from './page/ClientForm';

import { RequireAuth } from './context/RequireAuth';
import  "../src/assets/styles/global.css"
import Schedules from './page/Schedule';
import Cliente from './page/Cliente';
import UserForm from './page/UserForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/cadastro-cliente" element={<ClientForm/>} />
        <Route path="/cadastro-usuario" element={<UserForm/>} />
        <Route path="/cliente" element={<Cliente/>} />

        <Route path="/schedule/:clienteId" element={<Schedules/>} />

       
      </Routes>
    </div>
  );
}

export default App;

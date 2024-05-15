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
        
        <Route path="/cadastro-cliente" element={<RequireAuth><ClientForm/></RequireAuth>} />
        <Route path="/cadastro-usuario" element={<RequireAuth><UserForm/></RequireAuth>} />
        <Route path="/cliente" element={<RequireAuth><Cliente/></RequireAuth>} />

        <Route path="/schedule/:clienteId" element={<RequireAuth><Schedules/></RequireAuth>} /> 

       
      </Routes>
    </div>
  );
}

export default App;

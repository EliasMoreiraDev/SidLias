import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './page/LoginUser';
import ClientForm from './page/ClientForm';
import { Cliente } from './page/cliente';
import { RequireAuth } from './context/RequireAuth';
import  "../src/assets/styles/global.css"
import Schedules from './page/Schedule';
import NewSchedule from './page/NewSchedule';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/cadastro" element={<RequireAuth><ClientForm/></RequireAuth>} />
        <Route path="/cliente" element={<RequireAuth><Cliente/></RequireAuth>} />

        <Route path="/schedule/:clienteId" element={<Schedules/>} />

       
      </Routes>
    </div>
  );
}

export default App;

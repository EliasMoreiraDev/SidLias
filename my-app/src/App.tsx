import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './page/Login';
import TeacherForm from './page/TeacherForm';
import { Cliente } from './page/cliente';
import { RequireAuth } from './context/RequireAuth';
import  "../src/assets/styles/global.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<TeacherForm/>} />
        <Route path="/cliente" element={<RequireAuth><Cliente/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;

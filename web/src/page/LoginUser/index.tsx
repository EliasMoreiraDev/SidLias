import { User, Lock } from "lucide-react";
import "./styles.css";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (email && password) {
        const isLogged = await auth.signin(email, password);
        if (isLogged) {
          navigate("/cliente"); 
        } else {
          throw new Error("Não foi possível fazer login.");
        }
      } else {
        throw new Error("Preencha todos os campos."); 
      }
    } catch (error:any) {
      setError(error.message); 
    }
  }    

  return (
    <div id="page-login">
      <div className="formDiv">
        <div className="headerDiv">
          <h3>Login</h3>
        </div>
        <form action="" className="form-grid">
          <p className="p-login">Bem vindo de volta </p>

          <div className="inputDiv">
            <label htmlFor="username">E-mail</label>
            <div className="input flex">
              <User className="icon" />
              <input
                type="text"
                id="username"
                value={email}
                placeholder="Digite seu nome"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Senha</label>
            <div className="input flex">
              <Lock className="icon" />
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn" onClick={user}>
              <span>Login</span>
            </button>
          </div>

          <hr />

          {error && ( 
            <div className="error-message">{error}</div>
          )}

        </form>
      </div>
    </div>
  );
}
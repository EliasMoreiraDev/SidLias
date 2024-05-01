import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"; 
import { db } from '../src/db';
import {Request, Response} from "express"

const app = express();

app.use(cors());
app.use(express.json());


const secretKey = "seu_segredo_aqui";

export const getUser = (req:Request, res:Response) => {
  const q =
  "SELECT * FROM dados.usuario";

db.query(q, (err: any , results: any[]) => {
  if (err) {
    console.error(err); // Registre o erro no console para análise
    return res.status(500).json("Erro ao criar usuário.");
  }

  return res.status(200).json(results);
});
};

export const loginUser = (req:Request, res:Response) => {
  const setEmail = req.body.email;
  const setPassword = req.body.password;

  const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
  const values = [setEmail, setPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      res.status(500).send({ error: "Erro interno no servidor" });
    } else {
      if (results.length > 0) {
        const user = {
          id: results[0].id,
          email: results[0].email,
          tipoUsuario: results[0].tipo_usuario
        };


        const token = jwt.sign(user, secretKey);

        res.send({ success: true, user, token });
      } else {
        res.status(401).send({ message: 'Usuário não encontrado ou credenciais inválidas!' });
      }
    }
  });
};
export const addUser = (req:Request, res:Response) => {


  const sql = "INSERT INTO dados.usuario(`senha`, `nome`,`email`) VALUES(?,?,?)";

  const values = [
    req.body.senha,
    req.body.nome,
    req.body.email
  ];
  

  db.query(sql, values, (err: any) => {
    if (err) {
      console.error(err); 
      return res.status(500).json("Erro ao criar usuário.");
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
};








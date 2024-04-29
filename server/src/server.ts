import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"; 
import { db } from "./db";
import {Request, Response} from "express"

const app = express();

app.use(cors());
app.use(express.json());


const secretKey = "seu_segredo_aqui";

app.get('/', (req, res) => {
  res.send("hello");
});

app.post('/', (req, res) => {
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
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});



app.get('/cadastro', (req, res) => {
  const q = "SELECT * FROM usuario";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
})
});

app.post('/cadastro', (req, res) => {
  const q =
    "INSERT INTO cliente(`razaoSocial`, `fantasia`, `email`, `celular`, `link_instagram`, `link_facebook`, `link_linkedin`, `link_youtube`) VALUES(?,?,?,?,?,?,?,?)";

  const values = [
    req.body.razao,
    req.body.fantasia,
    req.body.email,
    req.body.celular,
    req.body.link_instagram,
    req.body.link_facebook,
    req.body.link_linkedin,
    req.body.link_youtube
  ];

  db.query(q, values, (err: any) => {
    if (err) {
      console.error(err); 
      return res.status(500).json("Erro ao criar usuário.");
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
});

import { db } from "../db.js";
import {Request, Response} from "express"

export const getUsers = (_: any, res: Response) => {
  const q = "SELECT * FROM usuarios";


    
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
export const addUser = (req: Request, res: Response) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `telefone`, `senha`, `link_instagram`, `link_facebook`, `link_linkedin`, `link_youtube`) VALUES(?,?,?,?,?,?,?,?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.senha,
    req.body.link_instagram,
    req.body.link_facebook,
    req.body.link_linkedin,
    req.body.link_youtube
  ];

  db.query(q, values, (err: any) => {
    if (err) {
      console.error(err); // Registre o erro no console para análise
      return res.status(500).json("Erro ao criar usuário.");
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

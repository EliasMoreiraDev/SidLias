import express from "express";
import cors from "cors";
import { db } from '../src/db';
import {Request, Response} from "express"

const app = express();

app.use(cors());
app.use(express.json());



export const getSchedules = (req:Request, res:Response) => {
  const q =
  "SELECT * FROM dados.programacao";

db.query(q, (err: any , results: any[]) => {
  if (err) {
    console.error(err); // Registre o erro no console para análise
    return res.status(500).json("Erro ao acessar banco.");
  }

  return res.status(200).json(results);
});
};

export const addSchedule = (req:Request, res:Response) => {
  
    const sql = "INSERT INTO dados.programacao(`cliente_id`, `descricao`, `diasSemana`,`dataPrevista`) VALUES(?,?,?,?)";
  
    const values = [
      req.body.cliente_id,
      req.body.descricao,
      req.body.diasSemana,
      req.body.dataPrevista
    ];
    
  
    db.query(sql, values, (err: any) => {
      if (err) {
        console.error(err); 
        return res.status(500).json("Erro ao criar usuário.");
      }
  
      return res.status(200).json("Usuário criado com sucesso.");
    });
  };


  export const consultSchedule = (req: Request, res: Response) => {
    const cliente_id = req.body.cliente_id; // Obter o cliente_id do corpo da requisição
  
    const sql = "SELECT * FROM dados.programacao p WHERE p.cliente_id = ?";
    const values = [cliente_id];
  
    db.query(sql, values, (err: any, results: any[]) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
  
      return res.status(200).json(results);
    });
  };
  
  







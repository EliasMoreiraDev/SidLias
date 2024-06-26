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
    console.error(err);
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
    const cliente_id = req.params.cliente_id; // Obter o cliente_id dos parâmetros da consulta na URL
  
    if (!cliente_id) {
      return res.status(400).json({ error: 'Parâmetro cliente_id ausente na URL.' });
    }
  
    const sql = "SELECT * FROM dados.programacao p WHERE p.cliente_id = ?";
    const values = [cliente_id];
  
    db.query(sql, values, (err: any, results: any[]) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao consultar programações.' });
      }
  
      return res.status(200).json(results);
    });
  };
  export const deleteSchedule = (req: Request, res: Response) => {
    const scheduleId = req.params.scheduleId;
  
    if (!scheduleId) {
      return res.status(400).json({ error: 'ID do item de programação ausente na URL.' });
    }
  
    const deleteStatusQuery = "DELETE FROM dados.programacaostatus WHERE programacao_id = ?";
    const deleteScheduleQuery = "DELETE FROM dados.programacao WHERE id = ?";
  
    db.query(deleteStatusQuery, [scheduleId], (statusErr: any) => {
      if (statusErr) {
        console.error(statusErr);
        return res.status(500).json({ error: 'Erro ao excluir os status relacionados.' });
      }
  
      db.query(deleteScheduleQuery, [scheduleId], (scheduleErr: any) => {
        if (scheduleErr) {
          console.error(scheduleErr);
          return res.status(500).json({ error: 'Erro ao excluir o item de programação.' });
        }
  
        return res.status(200).json({ message: 'Item de programação excluído com sucesso.' });
      });
    });
  };
  
  export const updateSchedule = (req: Request, res: Response) => {
    const scheduleId = req.params.scheduleId;
    const { descricao, diasSemana, dataPrevista } = req.body;
  
    const sql = "UPDATE dados.programacao SET descricao = ?, diasSemana = ?, dataPrevista = ? WHERE id = ?";
    const values = [descricao, diasSemana, dataPrevista, scheduleId];
  
    db.query(sql, values, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar o schedule.' });
      }
  
      return res.status(200).json({ message: 'Schedule atualizado com sucesso.' });
    });
  };
  
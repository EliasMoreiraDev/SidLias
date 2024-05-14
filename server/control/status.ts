import express from "express";
import cors from "cors";
import { db } from '../src/db';
import {Request, Response} from "express"

export const getStatus = (req:Request, res:Response) => {
  const q =
  "SELECT * FROM dados.programacaostatus";

db.query(q, (err: any , results: any[]) => {
  if (err) {
    console.error(err); // Registre o erro no console para análise
    return res.status(500).json("Erro ao acessar banco.");
  }

  return res.status(200).json(results);
});
};

export const addStatus = (req: Request, res: Response) => {
  const sql = "INSERT INTO dados.programacaostatus(`programacao_id`, `descricao`,`status`, `data`) VALUES(?,?,?,NOW())";

  const values = [
    req.body.programacao_id,
    req.body.descricao,
    req.body.status
  ];

  db.query(sql, values, (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Erro ao adicionar status.");
    }

    return res.status(200).json("Status adicionado com sucesso.");
  });
};



  export const consultStatus = (req: Request, res: Response) => {
    const programacao_id = req.params.programacao_id; // Obter o cliente_id dos parâmetros da consulta na URL
  
    if (!programacao_id) {
      return res.status(400).json({ error: 'Parâmetro cliente_id ausente na URL.' });
    }
  
    const sql = "SELECT * FROM dados.programacaostatus ps WHERE ps.programacao_id = ?";
    const values = [programacao_id];
  
    db.query(sql, values, (err: any, results: any[]) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao consultar programações.' });
      }
  
      return res.status(200).json(results);
    });
  };

  export const updateStatus = (req: Request, res: Response) => {
    const statusId = req.params.statusId;

    if (!statusId) {
      return res.status(400).json({ error: 'ID do status ausente na URL.' });
    }
    const { descricao, status } = req.body;
  
    const sql = "UPDATE dados.programacaostatus SET descricao = ?, status = ? WHERE id = ?";
    const values = [descricao, status, statusId];
  
    db.query(sql, values, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar o Status.' });
      }
  
      return res.status(200).json({ message: 'Status atualizado com sucesso.' });
    });
  };

  
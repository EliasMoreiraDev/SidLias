import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"; 
import { db } from '../src/db';
import {Request, Response} from "express"

export const getClient = (req: Request, res: Response) => {
  const q =
    "SELECT * FROM dados.cliente";

  db.query(q, (err: any, results: any[]) => {
    if (err) {
      console.error(err); // Registre o erro no console para análise
      return res.status(500).json(err);
    }

    return res.status(200).json(results);
  });
};

export const addClient = (req:Request, res:Response) => {
    const q =
      "INSERT INTO dados.cliente(`razaoSocial`, `fantasia`, `email`, `celular`, `link_instagram`, `link_facebook`, `link_linkedin`, `link_youtube`, `logo`) VALUES(?,?,?,?,?,?,?,?,?)";
  
    const values = [
      req.body.razaoSocial,
      req.body.fantasia,
      req.body.email,
      req.body.celular,
      req.body.link_instagram,
      req.body.link_facebook,
      req.body.link_linkedin,
      req.body.link_youtube,
      req.body.logo
    ];
  
    db.query(q, values, (err: any) => {
      if (err) {
        console.error(err); 
        return res.status(500).json("Erro ao criar usuário.");
      }
  
      return res.status(200).json("Usuário criado com sucesso.");
    });
  };
  export const deleteClient = (req: Request, res: Response) => {
    const clientId = req.params.clientId;
  
    if (!clientId) {
      return res.status(400).json({ error: 'ID do cliente ausente na URL.' });
    }
  
    const deleteProgramacaoQuery = "DELETE FROM dados.programacao WHERE cliente_id = ?";
    const deleteClientQuery = "DELETE FROM dados.cliente WHERE id = ?";
  
    db.beginTransaction((err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao iniciar a transação.' });
      }
  
      db.query(deleteProgramacaoQuery, [clientId], (err: any) => {
        if (err) {
          console.error(err);
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao excluir os registros de programação.' });
          });
        }
  
        db.query(deleteClientQuery, [clientId], (err: any) => {
          if (err) {
            console.error(err);
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao excluir o cliente.' });
            });
          }
  
          // Commit da transação se tudo ocorrer bem
          db.commit((err: any) => {
            if (err) {
              console.error(err);
              return db.rollback(() => {
                res.status(500).json({ error: 'Erro ao confirmar a transação.' });
              });
            }
            res.status(200).json({ message: 'Cliente e registros de programação excluídos com sucesso.' });
          });
        });
      });
    });
  };
  
  export const updateClient = (req: Request, res: Response) => {
    const clientId = req.params.clientId;
  
    const sql = "UPDATE dados.cliente SET razaoSocial = ?, fantasia = ?, email = ?, celular = ?, link_instagram = ?, link_facebook = ?, link_linkedin = ?, link_youtube = ?, logo = ? WHERE id = ?";

    const values = [
      req.body.razaoSocial,
      req.body.fantasia,
      req.body.email,
      req.body.celular,
      req.body.link_instagram,
      req.body.link_facebook,
      req.body.link_linkedin,
      req.body.link_youtube,
      req.body.logo,
      clientId
    ];
  
    db.query(sql, values, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar o Client.' });
      }
  
      return res.status(200).json({ message: 'Schedule atualizado com sucesso.' });
    });
  };
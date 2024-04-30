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
      "INSERT INTO dados.cliente(`razaoSocial`, `fantasia`, `email`, `celular`, `link_instagram`, `link_facebook`, `link_linkedin`, `link_youtube`) VALUES(?,?,?,?,?,?,?,?)";
  
    const values = [
      req.body.razaoSocial,
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
  };
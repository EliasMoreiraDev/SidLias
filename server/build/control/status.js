"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.consultStatus = exports.addStatus = exports.getStatus = void 0;
const db_1 = require("../src/db");
const getStatus = (req, res) => {
    const q = "SELECT * FROM dados.programacaostatus";
    db_1.db.query(q, (err, results) => {
        if (err) {
            console.error(err); // Registre o erro no console para análise
            return res.status(500).json("Erro ao acessar banco.");
        }
        return res.status(200).json(results);
    });
};
exports.getStatus = getStatus;
const addStatus = (req, res) => {
    const sql = "INSERT INTO dados.programacaostatus(`programacao_id`, `descricao`,`status`, `data`) VALUES(?,?,?,NOW())";
    const values = [
        req.body.programacao_id,
        req.body.descricao,
        req.body.status
    ];
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao adicionar status.");
        }
        return res.status(200).json("Status adicionado com sucesso.");
    });
};
exports.addStatus = addStatus;
const consultStatus = (req, res) => {
    const programacao_id = req.params.programacao_id; // Obter o cliente_id dos parâmetros da consulta na URL
    if (!programacao_id) {
        return res.status(400).json({ error: 'Parâmetro cliente_id ausente na URL.' });
    }
    const sql = "SELECT * FROM dados.programacaostatus ps WHERE ps.programacao_id = ?";
    const values = [programacao_id];
    db_1.db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao consultar programações.' });
        }
        return res.status(200).json(results);
    });
};
exports.consultStatus = consultStatus;
const updateStatus = (req, res) => {
    const statusId = req.params.statusId;
    if (!statusId) {
        return res.status(400).json({ error: 'ID do status ausente na URL.' });
    }
    const { descricao, status } = req.body;
    const sql = "UPDATE dados.programacaostatus SET descricao = ?, status = ? WHERE id = ?";
    const values = [descricao, status, statusId];
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar o Status.' });
        }
        return res.status(200).json({ message: 'Status atualizado com sucesso.' });
    });
};
exports.updateStatus = updateStatus;

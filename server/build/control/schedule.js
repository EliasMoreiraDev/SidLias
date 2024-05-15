"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchedule = exports.deleteSchedule = exports.consultSchedule = exports.addSchedule = exports.getSchedules = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../src/db");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const getSchedules = (req, res) => {
    const q = "SELECT * FROM dados.programacao";
    db_1.db.query(q, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao acessar banco.");
        }
        return res.status(200).json(results);
    });
};
exports.getSchedules = getSchedules;
const addSchedule = (req, res) => {
    const sql = "INSERT INTO dados.programacao(`cliente_id`, `descricao`, `diasSemana`,`dataPrevista`) VALUES(?,?,?,?)";
    const values = [
        req.body.cliente_id,
        req.body.descricao,
        req.body.diasSemana,
        req.body.dataPrevista
    ];
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao criar usuário.");
        }
        return res.status(200).json("Usuário criado com sucesso.");
    });
};
exports.addSchedule = addSchedule;
const consultSchedule = (req, res) => {
    const cliente_id = req.params.cliente_id; // Obter o cliente_id dos parâmetros da consulta na URL
    if (!cliente_id) {
        return res.status(400).json({ error: 'Parâmetro cliente_id ausente na URL.' });
    }
    const sql = "SELECT * FROM dados.programacao p WHERE p.cliente_id = ?";
    const values = [cliente_id];
    db_1.db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao consultar programações.' });
        }
        return res.status(200).json(results);
    });
};
exports.consultSchedule = consultSchedule;
const deleteSchedule = (req, res) => {
    const scheduleId = req.params.scheduleId;
    if (!scheduleId) {
        return res.status(400).json({ error: 'ID do item de programação ausente na URL.' });
    }
    const deleteStatusQuery = "DELETE FROM dados.programacaostatus WHERE programacao_id = ?";
    const deleteScheduleQuery = "DELETE FROM dados.programacao WHERE id = ?";
    db_1.db.query(deleteStatusQuery, [scheduleId], (statusErr) => {
        if (statusErr) {
            console.error(statusErr);
            return res.status(500).json({ error: 'Erro ao excluir os status relacionados.' });
        }
        db_1.db.query(deleteScheduleQuery, [scheduleId], (scheduleErr) => {
            if (scheduleErr) {
                console.error(scheduleErr);
                return res.status(500).json({ error: 'Erro ao excluir o item de programação.' });
            }
            return res.status(200).json({ message: 'Item de programação excluído com sucesso.' });
        });
    });
};
exports.deleteSchedule = deleteSchedule;
const updateSchedule = (req, res) => {
    const scheduleId = req.params.scheduleId;
    const { descricao, diasSemana, dataPrevista } = req.body;
    const sql = "UPDATE dados.programacao SET descricao = ?, diasSemana = ?, dataPrevista = ? WHERE id = ?";
    const values = [descricao, diasSemana, dataPrevista, scheduleId];
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar o schedule.' });
        }
        return res.status(200).json({ message: 'Schedule atualizado com sucesso.' });
    });
};
exports.updateSchedule = updateSchedule;

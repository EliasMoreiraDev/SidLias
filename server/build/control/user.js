"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.loginUser = exports.getUser = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../src/db");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const secretKey = "seu_segredo_aqui";
const getUser = (req, res) => {
    const q = "SELECT * FROM dados.usuario";
    db_1.db.query(q, (err, results) => {
        if (err) {
            console.error(err); // Registre o erro no console para análise
            return res.status(500).json("Erro ao criar usuário.");
        }
        return res.status(200).json(results);
    });
};
exports.getUser = getUser;
const loginUser = (req, res) => {
    const setEmail = req.body.email;
    const setPassword = req.body.password;
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [setEmail, setPassword];
    db_1.db.query(sql, values, (err, results) => {
        if (err) {
            res.status(500).send({ error: "Erro interno no servidor" });
        }
        else {
            if (results.length > 0) {
                const user = {
                    id: results[0].id,
                    email: results[0].email,
                    tipoUsuario: results[0].tipo_usuario
                };
                const token = jsonwebtoken_1.default.sign(user, secretKey);
                res.send({ success: true, user, token });
            }
            else {
                res.status(401).send({ message: 'Usuário não encontrado ou credenciais inválidas!' });
            }
        }
    });
};
exports.loginUser = loginUser;
const addUser = (req, res) => {
    const sql = "INSERT INTO dados.usuario(`senha`, `nome`,`email`) VALUES(?,?,?)";
    const values = [
        req.body.senha,
        req.body.nome,
        req.body.email
    ];
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao criar usuário.");
        }
        return res.status(200).json("Usuário criado com sucesso.");
    });
};
exports.addUser = addUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClient = exports.deleteClient = exports.addClient = exports.getClient = void 0;
const db_1 = require("../src/db");
const getClient = (req, res) => {
    const q = "SELECT * FROM dados.cliente";
    db_1.db.query(q, (err, results) => {
        if (err) {
            console.error(err); // Registre o erro no console para análise
            return res.status(500).json(err);
        }
        return res.status(200).json(results);
    });
};
exports.getClient = getClient;
const addClient = (req, res) => {
    const q = "INSERT INTO dados.cliente(`razaoSocial`, `fantasia`, `email`, `celular`, `link_instagram`, `link_facebook`, `link_linkedin`, `link_youtube`, `logo`) VALUES(?,?,?,?,?,?,?,?,?)";
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
    db_1.db.query(q, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao criar usuário.");
        }
        return res.status(200).json("Usuário criado com sucesso.");
    });
};
exports.addClient = addClient;
const deleteClient = (req, res) => {
    const clientId = req.params.clientId;
    if (!clientId) {
        return res.status(400).json({ error: 'ID do cliente ausente na URL.' });
    }
    const deleteProgramacaoQuery = "DELETE FROM dados.programacao WHERE cliente_id = ?";
    const deleteClientQuery = "DELETE FROM dados.cliente WHERE id = ?";
    db_1.db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao iniciar a transação.' });
        }
        db_1.db.query(deleteProgramacaoQuery, [clientId], (err) => {
            if (err) {
                console.error(err);
                return db_1.db.rollback(() => {
                    res.status(500).json({ error: 'Erro ao excluir os registros de programação.' });
                });
            }
            db_1.db.query(deleteClientQuery, [clientId], (err) => {
                if (err) {
                    console.error(err);
                    return db_1.db.rollback(() => {
                        res.status(500).json({ error: 'Erro ao excluir o cliente.' });
                    });
                }
                // Commit da transação se tudo ocorrer bem
                db_1.db.commit((err) => {
                    if (err) {
                        console.error(err);
                        return db_1.db.rollback(() => {
                            res.status(500).json({ error: 'Erro ao confirmar a transação.' });
                        });
                    }
                    res.status(200).json({ message: 'Cliente e registros de programação excluídos com sucesso.' });
                });
            });
        });
    });
};
exports.deleteClient = deleteClient;
const updateClient = (req, res) => {
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
    db_1.db.query(sql, values, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar o Client.' });
        }
        return res.status(200).json({ message: 'Schedule atualizado com sucesso.' });
    });
};
exports.updateClient = updateClient;

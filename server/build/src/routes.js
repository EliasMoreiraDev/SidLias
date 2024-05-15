"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("../control/client");
const user_1 = require("../control/user");
const schedule_1 = require("../control/schedule");
const status_1 = require("../control/status");
const routes = express_1.default.Router();
routes.get('/', user_1.getUser);
routes.post('/', user_1.loginUser);
routes.post('/cadastro-usuario', user_1.addUser);
routes.get('/cadastro-cliente', client_1.getClient);
routes.post('/cadastro-cliente', client_1.addClient);
routes.delete('/cliente/:clientId', client_1.deleteClient);
routes.put('/cliente/:clientId', client_1.updateClient);
routes.get('/schedules', schedule_1.getSchedules);
routes.get('/schedules/:cliente_id', schedule_1.consultSchedule);
routes.post('/cadastro-schedules', schedule_1.addSchedule);
routes.delete('/schedules/:scheduleId', schedule_1.deleteSchedule);
routes.put('/schedules/:scheduleId', schedule_1.updateSchedule);
routes.get('/status', status_1.getStatus);
routes.get('/status/:programacao_id', status_1.consultStatus);
routes.put('/status/:statusId', status_1.updateStatus);
routes.post('/add-status', status_1.addStatus);
exports.default = routes;

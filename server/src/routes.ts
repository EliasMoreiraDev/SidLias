import express from "express";
import { addClient, deleteClient, getClient, updateClient } from '../control/client';
import { addUser, getUser, loginUser } from '../control/user';
import { getSchedules, addSchedule, consultSchedule, deleteSchedule, updateSchedule } from '../control/schedule';

import {addStatus, consultStatus, getStatus, updateStatus} from '../control/status'

const routes = express.Router();

routes.get('/', getUser);
routes.post('/', loginUser);

routes.post('/cadastro-usuario', addUser);
routes.get('/cadastro-cliente', getClient);
routes.post('/cadastro-cliente', addClient);
routes.delete('/cliente/:clientId', deleteClient);
routes.put('/cliente/:clientId', updateClient);

routes.get('/schedules', getSchedules);
routes.get('/schedules/:cliente_id', consultSchedule);
routes.post('/cadastro-schedules', addSchedule);
routes.delete('/schedules/:scheduleId', deleteSchedule);
routes.put('/schedules/:scheduleId', updateSchedule);


routes.get('/status', getStatus);
routes.get('/status/:programacao_id', consultStatus);
routes.put('/status/:statusId', updateStatus);
routes.post('/add-status', addStatus)

export default routes;

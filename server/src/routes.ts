import express from "express";
import { addClient, getClient } from '../control/client';
import { addUser, getUser, loginUser } from '../control/user';
import { getSchedules, addSchedule, consultSchedule, deleteSchedule, updateSchedule } from '../control/schedule';

const routes = express.Router();

routes.get('/', getUser);
routes.post('/', loginUser);
routes.post('/cadastro-usuario', addUser);

routes.get('/cadastro-cliente', getClient);
routes.post('/cadastro-cliente', addClient);


routes.get('/schedules', getSchedules);


routes.get('/schedules/:cliente_id', consultSchedule);

routes.post('/cadastro-schedules', addSchedule);

routes.delete('/schedules/:scheduleId', deleteSchedule);


routes.put('/schedules/:scheduleId', updateSchedule);


export default routes;

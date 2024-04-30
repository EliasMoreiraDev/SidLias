import express from "express"
import {addClient, getClient} from '../control/client'
import {addUser, getUser, loginUser} from '../control/user'
import {getSchedules, addSchedule, consultSchedule} from '../control/schedule'
const routes = express.Router()


routes.get('/', getUser)

routes.post('/', loginUser)

routes.post('/cadastro-usuario', addUser)

routes.get('/cadastro-cliente', getClient)
routes.post('/cadastro-cliente', addClient)

routes.get('/schedules', getSchedules)
routes.post('/schedules', consultSchedule)

routes.post('/cadastro-schedule', addSchedule)

export default routes
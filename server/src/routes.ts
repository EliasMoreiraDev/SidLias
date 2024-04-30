import express from "express"
import {addClient, getClient} from '../control/client'
import {addUser, getUser} from '../control/user'

const routes = express.Router()


routes.get('/', getUser)

routes.post('/', loginUser)

routes.post('/cadastro-usuario', addUser)

routes.get('/cadastro-cliente', getClient)
routes.post('/cadastro-cliente', addClient)

export default routes
import express from 'express'
import UseRoutes from './routes'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())
app.use(UseRoutes)

app.listen(3333)
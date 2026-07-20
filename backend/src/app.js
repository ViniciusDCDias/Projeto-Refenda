import express from 'express'

import authLogin from './routes/auth.routes.js'
import UserRoutes from './routes/user.routes.js'
import CardapioRoutes from './routes/cardapio.routes.js'
import AgendaRoutes from './routes/agendamento.routes.js'

const app = express()

app.use(express.json())
app.use("/auth",authLogin)
app.use("/users",UserRoutes)
app.use("/cardapio",CardapioRoutes)
app.use("/agendamentos",AgendaRoutes)
export default app
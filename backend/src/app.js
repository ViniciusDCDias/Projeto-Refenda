import express from 'express'
import authLogin from './routes/auth.routes.js'

const app = express()
//importar as routes...

app.use(express.json())
app.use("/auth",authLogin)

export default app
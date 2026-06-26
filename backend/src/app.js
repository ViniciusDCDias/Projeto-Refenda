import express from 'express'
import authLogin from './routes/auth.routes'

const app = express()

app.use(express.json())
app.use("/auth",authLogin)
import express from 'express'
import authLogin from './routes/auth.routes.js'
import { authMiddleware } from './middlewares/authMiddleware.js'
import UserRoutes from './routes/user.routes.js'
const app = express()

app.use(express.json())
app.use("/auth",authLogin)
app.use("/users",UserRoutes)

export default app
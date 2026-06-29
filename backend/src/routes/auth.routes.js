import { Router } from "express";
import {login} from '../controllers/auth.controller.js'

const router = Router();

//definir as rotas user
router.post("/login", login)

export default router;
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createRefeicao } from "../controllers/cardapio.controller.js";

const router = Router()

router.post("/",authMiddleware,createRefeicao)

export default router
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createRefeicao,excludeRefeicao } from "../controllers/cardapio.controller.js";

const router = Router()

router.post("/",authMiddleware,createRefeicao)
router.delete("/:data",authMiddleware,excludeRefeicao)

export default router
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createRefeicao, excludeRefeicao, updateRefeicao, cardapioDia } from "../controllers/cardapio.controller.js";

const router = Router()

router.post("/",authMiddleware,createRefeicao)
router.delete("/:data",authMiddleware,excludeRefeicao)
router.put("/:data",authMiddleware,updateRefeicao)
router.get("/hoje",authMiddleware,cardapioDia)

export default router
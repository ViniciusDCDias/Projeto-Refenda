import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CreateAgendamento, CountAgendamentos, consultarAgendamentos } from "../controllers/agendamento.controller.js";

const router = Router()

router.post("/",authMiddleware,CreateAgendamento)
router.get("/relatorio/dia",authMiddleware,CountAgendamentos)
router.get("/realtorio/mes",authMiddleware,consultarAgendamentos)

export default router
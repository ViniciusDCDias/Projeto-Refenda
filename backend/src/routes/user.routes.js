import { Router } from "express";
import { listUsers, createUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/",authMiddleware,listUsers)
router.post("/",authMiddleware,createUser)

export default router
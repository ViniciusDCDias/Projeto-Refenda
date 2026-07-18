import { Router } from "express";
import { listUsers, createUser, excludeUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/",authMiddleware,listUsers)
router.post("/",authMiddleware,createUser)
router.delete("/:email",authMiddleware,excludeUser)
export default router
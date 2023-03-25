import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

//routes

router.post("/", createUser);

export default router;

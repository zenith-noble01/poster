import { Router } from "express";
import {
  getConversation,
  newConversation,
} from "../controllers/conversationController.js";

const router = Router();

//routes
router.post("/", newConversation);
router.get("/:id", getConversation);

export default router;

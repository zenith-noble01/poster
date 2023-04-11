import { Router } from "express";
import {
  getMessageByConversation,
  newMessage,
} from "../controllers/messageController.js";

const router = Router();

router.post("/", newMessage);
router.get("/:conversationId", getMessageByConversation);

export default router;

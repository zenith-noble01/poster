import { Router } from "express";
import * as comment from "../controllers/commentController.js";

const router = Router();

router.post("/:postId", comment.commnetPost);
router.get("/p/:postId", comment.getPostComment);

export default router;

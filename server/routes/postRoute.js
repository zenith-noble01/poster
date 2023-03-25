import { Router } from "express";
import * as post from "../controllers/postController.js";
import Authentication from "../middleware/authentication.js";

const router = Router();

router.post("/", post.createPost);
router.put("/update", Authentication, post.updatePost);
router.delete("/:postId", post.deletePost);
router.get("/all", post.getAllPost);
router.get("/:postId", post.getAPost);
router.get("/profile/:username", post.getUserPost);

router.put("/:postId/like", post.likePost);

export default router;

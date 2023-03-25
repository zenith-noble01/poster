import { Router } from "express";
import * as user from "../controllers/userController.js";
import Authentication from "../middleware/authentication.js";

const router = Router();

//routes
router.post("/register", user.createUser);
router.post("/login", user.loginUser);
router.put("/updateUser", Authentication, user.updateUser);
router.put("/:id/unfollow", Authentication, user.unFollowUser);
router.put("/:id/follow", Authentication, user.followUser);
router.get("/user/:username", user.getUser);
router.get("/u/:userId", user.getUserById);
router.post("/delete", Authentication, user.deleteUser);
router.get("/all", user.getallUsers);

export default router;

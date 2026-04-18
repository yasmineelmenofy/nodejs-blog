import express from "express";
import {
  getAdmin,
  loginAdmin,
  getDashboard,
  getAddPost,
  createPost,
  getEditPost,
  updatePost,
  deletePost,
  register,
  logout,
} from "../controllers/admin.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/admin", getAdmin);
router.post("/admin", loginAdmin);

router.get("/dashboard", authMiddleware, getDashboard);

router.get("/add-post", authMiddleware, getAddPost);
router.post("/add-post", authMiddleware, createPost);

router.get("/edit-post/:id", authMiddleware, getEditPost);
router.put("/edit-post/:id", authMiddleware, updatePost);

router.delete("/delete-post/:id", authMiddleware, deletePost);

router.post("/register", register);
router.get("/logout", logout);

export default router;

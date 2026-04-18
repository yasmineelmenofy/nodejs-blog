import express from "express";
import {
  getHome,
  getPost,
  searchPosts,
  getAbout,
} from "../controllers/home.controller";

const router = express.Router();

router.get("/", getHome);
router.get("/post/:id", getPost);
router.post("/search", searchPosts);
router.get("/about", getAbout);

export default router;

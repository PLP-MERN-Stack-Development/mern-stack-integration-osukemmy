import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import { body, validationResult } from "express-validator";

const router = express.Router();

// VALIDATION middleware
const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", validatePost, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;

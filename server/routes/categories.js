import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";

import { body, validationResult } from "express-validator";

const router = express.Router();

const validateCategory = [
  body("name").notEmpty().withMessage("Category name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

router.get("/", getCategories);
router.post("/", validateCategory, createCategory);

export default router;

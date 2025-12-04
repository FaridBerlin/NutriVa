import express from "express";
import { signup, login, getUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateSignup,
  validateLogin,
  handleValidationErrors,
} from "../middleware/validators.js";

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post("/signup", validateSignup, handleValidationErrors, signup);

// POST /api/auth/login - Login user
router.post("/login", validateLogin, handleValidationErrors, login);

// GET /api/auth/me - Get current authenticated user (verify token)
router.get("/me", protect, getUser);

export default router;

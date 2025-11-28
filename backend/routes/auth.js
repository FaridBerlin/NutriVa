import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
validateSignup,
validateLogin,
handleValidationErrors,
} from "../middleware/validators.js";

const router = express.Router();

router.post("/signup", validateSignup, handleValidationErrors, signup);
router.post("/login", validateLogin, handleValidationErrors, login);
router.get("/profile", protect, getProfile);

export default router;
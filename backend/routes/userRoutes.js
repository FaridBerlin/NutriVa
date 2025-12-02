import { Router} from "express";
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const userRouter = Router();

userRouter
    .get("/me", protect, getUserProfile)
    .put("/me", protect, updateUserProfile);
  

export default userRouter;
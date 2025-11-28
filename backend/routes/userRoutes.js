import { Router} from "express";
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const userRouter = Router();

userRouter
    .get('/me', protect, getProfile)
    .put('/me', protect, updateProfile)
  

export default userRouter;
<<<<<<< HEAD
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUser, updateUser, changePassword } from "../controllers/userController.js";
=======
import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getUser, updateUser } from '../controllers/userController.js'
>>>>>>> dev

const userRouter = Router()

// All routes require authentication
userRouter.use(protect)

// GET /api/user/me - Get basic user info (name, email)
userRouter.get('/me', getUser)

// PUT /api/user/me - Update basic user info (name, email only)
userRouter.put('/me', updateUser)

<<<<<<< HEAD
// PUT /api/user/change-password - Change user password
userRouter.put("/change-password", changePassword);

export default userRouter;
=======
export default userRouter
>>>>>>> dev

import { Router} from "express";
import { protect } from '../middleware/authMiddleware.js';
import { validateProfile, validateProfileUpdate, handleValidationErrors } from "../middleware/validators.js"
import { completeProfile, getCurrentProfile, updateProfile, deleteProfile, testProfile } from '../controllers/profileController.js';

const profileRouter = Router();

profileRouter

    .get("/test", protect, validateProfile, testProfile)
    .post("/complete", protect, validateProfile, handleValidationErrors, completeProfile)
    .get("/", protect, getCurrentProfile)
    .put("/", protect, updateProfile)
    .delete("/", protect, deleteProfile)
  

export default profileRouter;
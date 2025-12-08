import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  mealValidator,
  mealValidatorUpdate,
  handleValidationErrors,
} from "../middleware/validators.js";
import {
  createMeal,
  getAllMeals,
  getMyCreatedMeals,
  getMealById,
  getMealsByCategory,
  getMealsByType,
  updateMeal,
  deleteMeal,
  toggleFavorite
} from "../controllers/mealController.js";

const mealRouter = Router();

mealRouter.use(protect);
mealRouter
    .post("/", mealValidator, handleValidationErrors, createMeal)
    .get("/", getAllMeals)
    .get("/me", getMyCreatedMeals)
    .get("/:id", getMealById)
    .put("/:id", mealValidatorUpdate, handleValidationErrors, updateMeal)
    .get("/category/:category", getMealsByCategory)
    .get("/type/:type", getMealsByType)
    .delete("/:id", deleteMeal)
    .post("/:id/favorite", toggleFavorite);


export default mealRouter;
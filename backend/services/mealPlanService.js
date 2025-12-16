/**
 * Meal Plan Service - Core Business Logic
 * backend/services/mealPlanService.js
 *
 * Now uses Strategy Pattern for meal generation.
 * Supports multiple generation strategies: mock data, AI models, external APIs.
 *
 * Architecture:
 * - mealGenerationStrategy.js: Abstract strategy and implementations
 * - mealGeneratorConfig.js: Configuration and factory
 * - This file: Orchestrates the generation process
 */

import mealDatabase from '../data/mealDatabase.js'
import mealGeneratorConfig from '../config/mealGeneratorConfig.js'
import { calculateBMR, calculateTDEE } from '../utils/nutritionCalculations.js'
import {
  adjustCaloriesForGoal,
  calculateMacroTargets,
  selectMealForCategory,
  calculateDayNutrition,
  calculateMacroPercentages,
  validateNutrition,
  generatePlanNutritionSummary,
} from '../utils/mealPlanUtils.js'

// ============================================================================
// BMR & TDEE CALCULATIONS (Imported from utils)
// ============================================================================

// Note: calculateBMR and calculateTDEE are now imported from ../utils/nutritionCalculations.js
// Utility functions are now imported from ../utils/mealPlanUtils.js

// ============================================================================
// MAIN MEAL PLAN GENERATION
// ============================================================================

/**
 * Generate personalized meal plan
 * Main entry point for meal plan generation
 *
 * @param {object} params - Generation parameters
 * @returns {object} Complete meal plan with nutrition data
 */
/**
 * Generate a personalized meal plan using the configured strategy
 * @param {object} params - Generation parameters
 * @returns {Promise<object>} Generated meal plan
 */
async function generateMealPlan(params) {
  try {
    // Get the configured meal generator
    const generator = mealGeneratorConfig.getMealGenerator()

    // Log which generator is being used (helpful for debugging)
    const config = mealGeneratorConfig.getGeneratorConfig()
    console.log(`🔄 Generating meal plan using ${config.type} strategy`)

    // Delegate to the strategy
    const mealPlan = await generator.generate(params)

    console.log(
      `✅ Meal plan generated successfully with ${mealPlan.days.length} days`,
    )
    return mealPlan
  } catch (error) {
    console.error('❌ Meal plan generation failed:', error.message)
    throw new Error(`Meal plan generation failed: ${error.message}`)
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Main generation function (now uses strategy pattern)
  generateMealPlan,

  // Utility functions (used by MockMealGenerator)
  calculateBMR, // Imported from utils
  calculateTDEE, // Imported from utils
  adjustCaloriesForGoal,
  calculateMacroTargets,
  selectMealForCategory,
  calculateDayNutrition,
  calculateMacroPercentages,
  validateNutrition,
  generatePlanNutritionSummary,

  // Configuration access
  getGeneratorConfig: mealGeneratorConfig.getGeneratorConfig,
}

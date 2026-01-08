/**
 * ❌ DEPRECATED - NOT IN USE
 * 
 * Meal Generator Configuration
 * backend/config/mealGeneratorConfig.js
 *
 * STATUS: This file is NO LONGER USED in the current implementation.
 * REPLACED BY: Direct usage of generateTemplateMealPlan() in aiMealPlanController.js
 * 
 * REASON: We simplified the architecture by removing the strategy pattern.
 * Controllers now directly call generateTemplateMealPlan() from mealPlanUtils.js
 *
 * Original Purpose:
 * - Controls which meal generation strategy to use
 * - Supports easy switching between mock data, AI models, and external APIs
 */

/*
// COMMENTED OUT - File kept for reference only

import { MockMealGenerator, OllamaMealGenerator, OpenAIMealGenerator } from '../services/mealGenerationStrategy.js'

function getMealGenerator() {
  const generatorType = process.env.MEAL_GENERATOR || 'mock'

  switch (generatorType.toLowerCase()) {
    case 'ollama':
      return new OllamaMealGenerator()

    case 'openai':
      return new OpenAIMealGenerator()

    case 'mock':
    default:
      return new MockMealGenerator()
  }
}

/**
 * Get current generator configuration info
 * Useful for logging and debugging
 * @returns {object} Configuration details
 */
function getGeneratorConfig() {
  const generatorType = process.env.MEAL_GENERATOR || 'mock'

  return {
    type: generatorType,
    ollamaUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    timestamp: new Date().toISOString(),
  }
}

export default {
  getMealGenerator,
  getGeneratorConfig,
}

// END OF COMMENTED CODE
*/
  getMealGenerator,
  getGeneratorConfig,
}
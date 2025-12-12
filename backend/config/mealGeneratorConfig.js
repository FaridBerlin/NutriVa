/**
 * Meal Generator Configuration
 * backend/config/mealGeneratorConfig.js
 *
 * Controls which meal generation strategy to use.
 * Supports easy switching between mock data, AI models, and external APIs.
 *
 * Environment Variables:
 * - MEAL_GENERATOR: "mock" | "ollama" | "openai" (default: "mock")
 * - OLLAMA_BASE_URL: Base URL for Ollama API (default: "http://localhost:11434")
 * - OPENAI_API_KEY: API key for OpenAI (required if using openai)
 */

import { MockMealGenerator, OllamaMealGenerator, OpenAIMealGenerator } from '../services/mealGenerationStrategy.js'

/**
 * Get the current meal generator based on environment configuration
 * @returns {MealGenerationStrategy} Configured meal generator instance
 */
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
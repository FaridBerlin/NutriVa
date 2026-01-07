import { Ollama } from 'ollama'
import { jsonrepair } from 'jsonrepair'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Ollama client
let ollama
try {
  ollama = new Ollama({ host: 'http://127.0.0.1:11434' })
  console.log('Ollama client initialized successfully')
} catch (error) {
  console.error('Failed to initialize Ollama client:', error)
}

/**
 * Generate a meal plan using Ollama with qwen2.5:3b model
 */
export const generateMealPlan = async (params) => {
  if (!ollama) {
    throw new Error(
      JSON.stringify({
        code: 'OLLAMA_NOT_INITIALIZED',
        message: 'Ollama client not initialized',
        details: 'Make sure Ollama is running with: ollama serve',
      }),
    )
  }

  try {
    const {
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      planDuration,
      fitnessGoal,
      foodType,
      restrictionsAndAllergies,
      mealPerDay,
      dailyCalories, // 🎯 NEW: Get daily calorie target from controller
    } = params

    // 🎯 Calculate target calories per meal for tier guidance
    const caloriesPerMeal = dailyCalories
      ? Math.round(dailyCalories / mealPerDay)
      : 500

    // 🎯 Determine calorie range based on meals per day
    let calorieRange = '500-600'
    if (caloriesPerMeal > 900) {
      calorieRange = '900-1200'
    } else if (caloriesPerMeal > 600) {
      calorieRange = '600-900'
    }

    // Load prompt template
    const promptPath = path.join(__dirname, '../prompts/mealPlanPrompt.txt')
    let promptTemplate = fs.readFileSync(promptPath, 'utf8')

    // Replace placeholders
    const prompt = promptTemplate
      .replace(/{{age}}/g, age)
      .replace(/{{weight}}/g, weight)
      .replace(/{{height}}/g, height)
      .replace(/{{gender}}/g, gender)
      .replace(/{{activityLevel}}/g, activityLevel)
      .replace(/{{goal}}/g, goal)
      .replace(/{{planDuration}}/g, planDuration)
      .replace(/{{fitnessGoal}}/g, fitnessGoal || goal)
      .replace(/{{foodType}}/g, foodType || 'both')
      .replace(
        /{{restrictionsAndAllergies}}/g,
        restrictionsAndAllergies || 'None',
      )
      .replace(/{{mealPerDay}}/g, mealPerDay || 4)
      .replace(/{{dailyCalories}}/g, dailyCalories || 2000) // 🎯 NEW
      .replace(/{{caloriesPerMeal}}/g, caloriesPerMeal) // 🎯 NEW
      .replace(/{{calorieRange}}/g, calorieRange) // 🎯 NEW

    console.log('Generating meal plan with qwen2.5:3b...')
    console.log(
      `🎯 Target: ${dailyCalories} cal/day, ${caloriesPerMeal} cal/meal (${calorieRange} range)`,
    )
    const startTime = Date.now()

    // Calculate tokens based on plan duration (more aggressive reduction)
    // For 3 days: ~900 tokens, for 7 days: ~1400 tokens
    const numPredict = Math.min(2048, 300 + planDuration * mealPerDay * 50)

    // Generous timeout based on plan duration (45 seconds per day, min 150s)

    // gemma2:9b typically takes 2+ minutes for 3-day plans

    // qwen2.5:3b btypically takes 40sec  for 3-day plans and 70sec for 7-day plans

    const timeoutMs = Math.max(150000, planDuration * 45000) // 2.5min-22.5min range
    console.log(
      `⏱️  Timeout set to ${Math.round(timeoutMs / 1000)}s for ${planDuration} day plan`,
    )

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Generation timeout')), timeoutMs)
    })

    const generationPromise = ollama.generate({
      model: 'qwen2.5:3b',
      prompt: prompt,
      stream: false,
      format: 'json',
      options: {
        temperature: 0.7, // Slightly higher for more creativity
        num_predict: numPredict,
        num_ctx: 2048, // Smaller context for faster processing
        top_k: 30, // More focused selection
        top_p: 0.9,
        repeat_penalty: 1.1, // Reduce repetition
      },
    })

    // Race between generation and timeout
    const response = await Promise.race([generationPromise, timeoutPromise])

    console.log(`Generation took ${Date.now() - startTime}ms`)

    // Parse response
    let jsonText = response.response
    const firstBrace = jsonText.indexOf('{')
    const lastBrace = jsonText.lastIndexOf('}')

    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1)
    }

    let mealPlanData
    try {
      mealPlanData = JSON.parse(jsonText)
    } catch (parseError) {
      console.warn('JSON parse failed, attempting repair...')
      const repaired = jsonrepair(jsonText)
      mealPlanData = JSON.parse(repaired)
    }

    // Validate structure
    if (!mealPlanData?.days || !Array.isArray(mealPlanData.days)) {
      throw new Error('Invalid meal plan structure')
    }

    return mealPlanData
  } catch (error) {
    console.error('Error generating meal plan:', error)
    throw new Error(
      JSON.stringify({
        code: 'OLLAMA_API_ERROR',
        message: 'Failed to generate meal plan',
        details: error.message,
      }),
    )
  }
}

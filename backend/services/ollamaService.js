import { Ollama } from 'ollama'
import { jsonrepair } from 'jsonrepair'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import config from '../config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Ollama client
const ollama = new Ollama({
  host: config.OLLAMA_HOST,
  headers: config.OLLAMA_API_KEY
    ? { Authorization: 'Bearer ' + config.OLLAMA_API_KEY }
    : {},
})

console.log('Ollama client initialized successfully')
console.log('🔑 API Key loaded:', config.OLLAMA_API_KEY ? 'Yes' : '❌ NO')

/**
 * Generate a meal plan using Ollama with gpt-oss:120b model
 */
export const generateMealPlan = async (params) => {
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

    console.log(`Generating meal plan with ${config.OLLAMA_MODEL}...`)
    console.log(
      `🎯 Target: ${dailyCalories} cal/day, ${caloriesPerMeal} cal/meal (${calorieRange} range)`,
    )
    const startTime = Date.now()

    // Token budget. Each meal serialises to roughly 120-180 tokens of JSON, and
    // reasoning models spend part of the budget before emitting any answer, so
    // this is deliberately generous - too small a budget returns an empty
    // response rather than a short one.
    const numPredict = Math.min(16384, 1500 + planDuration * mealPerDay * 220)

    // The context has to hold the prompt AND the generated plan. The previous
    // 2048 could not fit a multi-day plan, which truncated the JSON.
    const numCtx = Math.min(32768, 4096 + planDuration * mealPerDay * 260)

    // Generous timeout based on plan duration (45 seconds per day, min 150s)

    // gemma2:9b typically takes 2+ minutes for 3-day plans

    // qwen2.5:3b btypically takes 40sec  for 3-day plans and 70sec for 7-day plans

    const timeoutMs = Math.max(150000, planDuration * 45000) // 2.5min-22.5min range
    console.log(
      `⏱️  Timeout set to ${Math.round(timeoutMs / 1000)}s for ${planDuration} day plan`,
    )

    // Kept so the timer can be cleared; an uncleared 22-minute timeout would
    // otherwise hold the event loop open after a fast generation.
    let timeoutId
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('Generation timeout')),
        timeoutMs,
      )
    })

    const generationPromise = ollama.generate({
      model: config.OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
      format: 'json',
      // Reasoning models route their chain-of-thought into a separate field
      // and it consumes the same token budget; keep it minimal so the budget
      // goes to the actual plan.
      think: 'low',
      options: {
        temperature: 0.7, // Slightly higher for more creativity
        num_predict: numPredict,
        num_ctx: numCtx,
        top_k: 30, // More focused selection
        top_p: 0.9,
        repeat_penalty: 1.1, // Reduce repetition
      },
    })

    // Race between generation and timeout
    let response
    try {
      response = await Promise.race([generationPromise, timeoutPromise])
    } finally {
      clearTimeout(timeoutId)
    }

    console.log(`Generation took ${Date.now() - startTime}ms`)

    // Parse response
    let jsonText = response.response || ''

    if (!jsonText.trim()) {
      throw new Error(
        `Model returned an empty response (done_reason=${response.done_reason}, ` +
          `eval_count=${response.eval_count}). The token budget may be too small.`,
      )
    }
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

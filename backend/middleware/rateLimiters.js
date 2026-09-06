import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

// Shared JSON error shape so the frontend can surface a useful message.
const limitHandler = (message) => (req, res) => {
  res.status(429).json({ success: false, message })
}

// Credential endpoints: brute-force protection.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: limitHandler(
    'Too many attempts. Please try again in a few minutes.',
  ),
})

// Password reset requests: also limits outbound email volume.
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitHandler(
    'Too many password reset requests. Please try again later.',
  ),
})

// AI endpoints call a metered cloud LLM, so throttle per authenticated user.
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) =>
    req.user?._id?.toString() || ipKeyGenerator(req.ip),
  handler: limitHandler(
    'AI request limit reached for this hour. Please try again later.',
  ),
})

// Meal plan generation is the most expensive call in the app.
export const mealPlanLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) =>
    req.user?._id?.toString() || ipKeyGenerator(req.ip),
  handler: limitHandler(
    'Meal plan generation limit reached for this hour. Please try again later.',
  ),
})

// Catch-all for everything else.
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitHandler('Too many requests. Please slow down.'),
})

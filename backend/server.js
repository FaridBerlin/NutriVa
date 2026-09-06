import config from './config/config.js' // Load dotenv via config
import express from 'express'
import connectDB from './config/dbConnect.js'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'

import userRouter from './routes/userRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import dietTrackerRouter from './routes/dietTrackerRoutes.js'
import aiMealPlanRouter from './routes/aiMealPlanRoutes.js'
import aiDoctorRouter from './routes/aiDoctorRoutes.js'
import { generalLimiter } from './middleware/rateLimiters.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

await connectDB()

const PORT = config.PORT
const frontendUrl = config.FRONTEND_URL

const app = express()

// Trust the first proxy hop so rate limiting sees real client IPs behind a
// reverse proxy / platform router.
app.set('trust proxy', 1)

app.use(helmet())
app.use(express.json({ limit: '100kb' }))
app.use(cookieParser())

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
)

app.use(generalLimiter)

// Routes
app.use('/api/auth', authRoutes)

app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/diet-trackers', dietTrackerRouter)

app.use('/api/ai-meal-plans', aiMealPlanRouter)
app.use('/api/ai-doctor', aiDoctorRouter)

app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

// Increase timeout for LLM processing (3 minutes)
server.timeout = 180000
server.keepAliveTimeout = 185000
server.headersTimeout = 190000

import express from 'express'
import connectDB from './config/dbConnect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'

import userRouter from './routes/userRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import dietTrackerRouter from './routes/dietTrackerRoutes.js'
import aiMealPlanRouter from './routes/aiMealPlanRoutes.js'

connectDB()

const PORT = process.env.PORT || 3000
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173' // from .env file

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
)

// Routes
app.use('/api/auth', authRoutes)

app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/diet-trackers', dietTrackerRouter)

app.use('/api/ai-meal-plans', aiMealPlanRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message || 'Server Error' })
})

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

// Increase timeout for LLM processing (3 minutes)
server.timeout = 180000
server.keepAliveTimeout = 185000
server.headersTimeout = 190000

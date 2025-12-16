import express from 'express'
import connectDB from './config/dbConnect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'

import userRouter from './routes/userRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import mealRouter from './routes/mealRoutes.js'
import mealPlanRouter from './routes/mealPlanRoutes.js'

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
app.use('/api/meal', mealRouter)
app.use('/api/meal-plans', mealPlanRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message || 'Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

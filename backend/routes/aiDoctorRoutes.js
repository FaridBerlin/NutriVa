import express from 'express'
import { chat, streamChat } from '../controllers/aiDoctorController.js'
import { protect } from '../middleware/authMiddleware.js'
import { aiLimiter } from '../middleware/rateLimiters.js'

const router = express.Router()

// All routes require authentication
router.use(protect)

// POST /api/ai-doctor/chat - Chat with AI Doctor
router.post('/chat', aiLimiter, chat)

// POST /api/ai-doctor/chat/stream - Stream chat with AI Doctor
router.post('/chat/stream', aiLimiter, streamChat)

export default router

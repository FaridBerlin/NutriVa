import express from 'express'
import { chat, streamChat } from '../controllers/aiDoctorController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(protect)

// POST /api/ai-doctor/chat - Chat with AI Doctor
router.post('/chat', chat)

// POST /api/ai-doctor/chat/stream - Stream chat with AI Doctor
router.post('/chat/stream', streamChat)

export default router

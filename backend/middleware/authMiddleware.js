import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  let token

  // Debug logging
  console.log('🍪 Cookies received:', req.cookies)
  console.log('📨 Authorization header:', req.headers.authorization)

  if (req.cookies.token) {
    token = req.cookies.token
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Not authorized to access this route' })
  }
  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: 'JWT_SECRET is not configured on the server' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Verify user still exists in database
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    } else {
      return res
        .status(401)
        .json({ message: 'Not authorized to access this route' })
    }
  }
}

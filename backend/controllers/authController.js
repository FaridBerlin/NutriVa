import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail.js'
import config from '../config/config.js'

const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  })
}

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id)

  const cookieExpireHours = config.COOKIE_EXPIRE
  const isProduction = config.NODE_ENV === 'production'

  const options = {
    expires: new Date(Date.now() + cookieExpireHours * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  }

  // Set cookie
  res.cookie('token', token, options)

  // Send response
  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileCompleted: user.profileCompleted,
    },
  })
}
export const signup = async (req, res) => {
  console.log(' SIGNUP REQUEST RECEIVED')
  console.log(' Email:', req.body.email)

  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email: email.toLowerCase() })
    if (user) {
      console.log(' User already exists')
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({
      name,
      email,
      password,
    })

    await user.save()
    console.log('✅ User created, sending cookie...')
    sendTokenResponse(user, 201, res)
  } catch (error) {
    console.log(' Signup error:', error.message)
    res.status(500).json({ message: error.message })
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    sendTokenResponse(user, 200, res)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'Logged out successfully',
    })
}

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email: email.toLowerCase() })

    // Always send the same response
    res.status(200).json({
      success: true,
      message: 'If that email exists, a reset link has been sent. Check your email.',
    })

    // If user does not exist, stop here
    if (!user) return

    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${config.FRONTEND_URL}/reset-password/${resetToken}`

    const message = `
You requested a password reset.

Click the link below to reset your password:
${resetUrl}

This link will expire in 15 minutes.

If you did not request this, please ignore this email.
`

    // Send email asynchronously
    sendEmail({
      to: user.email,
      subject: 'Password Reset - Nutriva MealPlanner',
      text: message,
    }).catch(err => {
      console.error('Password reset email failed:', err)
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    
  }
}

// Reset Password
export const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password')

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired reset token',
      })
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password reset successful.... Goto login',
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

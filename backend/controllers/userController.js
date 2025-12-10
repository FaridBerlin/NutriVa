import User from '../models/User.js'

// Get basic user info (name, email) - NOT profile data
export const getUser = async (req, res) => {
  console.log('req.user =', req.user)
  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update basic user info (name, email) - NOT password or profile data
export const updateUser = async (req, res) => {
  try {
    const updates = req.body
    // Prevent password updates through this endpoint
    delete updates.password
    delete updates.profileCompleted // Prevent manual manipulation

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

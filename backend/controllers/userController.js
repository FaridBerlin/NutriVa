import User from "../models/User.js";
import bcryptjs from "bcryptjs"; 

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
};

// Change user password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current password and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if current password is correct
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

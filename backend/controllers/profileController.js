import Profile from '../models/Profile.js'
import User from '../models/User.js'

// Fields a client is allowed to set on its own profile. `user` is deliberately
// absent: it is taken from the authenticated session, never from the body.
const PROFILE_UPDATABLE_FIELDS = [
  'age',
  'gender',
  'height',
  'weight',
  'activityLevel',
  'foodType',
  'dietaryGoal',
  'targetWeight',
  'startWeight',
]

const buildWarnings = (profile) => {
  const warnings = []
  const current = Number(profile.weight)
  const target = Number(profile.targetWeight)

  if (Number.isFinite(current) && Number.isFinite(target) && current > 0) {
    const percentChange = Math.abs(target - current) / current
    if (percentChange > 0.4) {
      warnings.push(
        'Target weight differs from current weight by more than 40% — this may be unrealistic',
      )
    }
    if (target < 30) {
      warnings.push('Target weight is below the recommended safety threshold')
    }
  }

  return warnings
}

export const completeProfile = async (req, res, next) => {
  try {
    const userId = req.user._id
    const existingProfile = await Profile.findOne({ user: userId })
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists.',
      })
    }

    const {
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietaryGoal,
      foodType,
      targetWeight,
      startWeight,
      weightHistory,
    } = req.body

    // Build create payload and ensure startWeight/weightHistory are initialized
    const createData = {
      user: userId,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietaryGoal,
      foodType,
      targetWeight,
    }

    // If a startWeight was provided, use it; otherwise default to current weight
    if (typeof startWeight !== 'undefined' && startWeight !== null) {
      createData.startWeight = startWeight
    } else if (typeof weight !== 'undefined' && weight !== null) {
      createData.startWeight = weight
    }

    // Initialize weightHistory: prefer provided history, else add the current weight point
    if (Array.isArray(weightHistory) && weightHistory.length > 0) {
      // normalize entries: ensure { weight: Number, date: Date }
      createData.weightHistory = weightHistory.map((entry) => ({
        weight: Number(entry.weight),
        date: entry.date ? new Date(entry.date) : new Date(),
      }))
    } else if (typeof weight !== 'undefined' && weight !== null) {
      createData.weightHistory = [{ weight: Number(weight), date: new Date() }]
    }

    const profile = await Profile.create(createData)

    //we need to import User here - this is very important to be updated
    await User.findByIdAndUpdate(userId, { profileCompleted: true })

    const warnings = buildWarnings(profile)

    res.status(201).json({
      success: true,
      message: 'Profile created successfully.',
      data: {
        profile: profile.toJSON(),
        nutritionTargets: profile.getNutritionTargets(),
        warnings,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id
    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'name email',
    )
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User Profile.',
      data: {
        profile: profile.toJSON(),
        nutritionTargets: profile.getNutritionTargets(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id

    // Load existing profile to allow appending to history when weight changes
    const existingProfile = await Profile.findOne({ user: userId })
    if (!existingProfile) {
      return res
        .status(404)
        .json({ success: false, message: 'Profile not found' })
    }

    const { weight, startWeight, weightHistory } = req.body

    // If weight provided and different, append to history
    if (typeof weight !== 'undefined' && weight !== null) {
      const newWeight = Number(weight)
      if (!isNaN(newWeight) && newWeight !== existingProfile.weight) {
        existingProfile.weightHistory = existingProfile.weightHistory || []
        existingProfile.weightHistory.push({
          weight: newWeight,
          date: new Date(),
        })
      }
    }

    // If explicit weightHistory provided, merge/replace (here we append provided entries)
    if (Array.isArray(weightHistory) && weightHistory.length > 0) {
      existingProfile.weightHistory = existingProfile.weightHistory || []
      const normalized = weightHistory.map((entry) => ({
        weight: Number(entry.weight),
        date: entry.date ? new Date(entry.date) : new Date(),
      }))
      existingProfile.weightHistory.push(...normalized)
    }

    // If startWeight provided, update it
    if (typeof startWeight !== 'undefined' && startWeight !== null) {
      existingProfile.startWeight = Number(startWeight)
    }

    // Apply remaining updates from the whitelist only. Assigning arbitrary
    // body keys would let a client rewrite `user` and reassign profile
    // ownership. weightHistory and startWeight are handled above.
    for (const field of PROFILE_UPDATABLE_FIELDS) {
      if (
        field !== 'startWeight' &&
        Object.prototype.hasOwnProperty.call(req.body, field)
      ) {
        existingProfile[field] = req.body[field]
      }
    }

    const profile = await existingProfile.save()

    const warnings = buildWarnings(profile)

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        profile: profile.toJSON(),
        nutritionTargets: profile.getNutritionTargets(),
        warnings,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.user._id
    const profile = await Profile.findOneAndDelete({ user: userId })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.',
      })
    }
    await User.findByIdAndUpdate(userId, { profileCompleted: false })
    res.status(200).json({
      success: true,
      message: 'User Profile deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}

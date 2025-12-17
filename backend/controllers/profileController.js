import Profile from '../models/Profile.js'
import User from '../models/User.js'
import {
  bmiPercent as calcBmiPercent,
  bmiCategory as calcBmiCategory,
} from '../utils/nutritionCalculations.js'

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

    res.status(201).json({
      success: true,
      message: 'Profile created successfully.',
      data: {
        profile: profile.toJSON(),
        nutritionTargets: {
          bmi: profile.bmi,
          bmiPercent: calcBmiPercent(profile.bmi),
          bmiCategory: calcBmiCategory(profile.bmi),
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories(),
        },
        warnings: (() => {
          const warnings = []
          try {
            const current = Number(profile.weight)
            const target = Number(profile.targetWeight)
            if (target && current) {
              const percentChange = Math.abs(target - current) / current
              if (percentChange > 0.4) {
                warnings.push(
                  'Target weight differs from current weight by more than 40% — this may be unrealistic',
                )
              }
              if (target < 30) {
                warnings.push(
                  'Target weight is below the recommended safety threshold',
                )
              }
            }
          } catch (err) {
            // ignore
          }
          return warnings
        })(),
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
        nutritionTargets: {
          bmi: profile.bmi,
          bmiPercent: calcBmiPercent(profile.bmi),
          bmiCategory: calcBmiCategory(profile.bmi),
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories(),
        },
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

    // Apply other updates from body (excluding weightHistory which we've handled)
    const updatable = { ...req.body }
    delete updatable.weightHistory
    // assign remaining fields onto the document
    Object.keys(updatable).forEach((k) => {
      existingProfile[k] = updatable[k]
    })

    const profile = await existingProfile.save()

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        profile: profile.toJSON(),
        nutritionTargets: {
          bmi: profile.bmi,
          bmiPercent: calcBmiPercent(profile.bmi),
          bmiCategory: calcBmiCategory(profile.bmi),
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories(),
        },
        warnings: (() => {
          const warnings = []
          try {
            const current = Number(profile.weight)
            const target = Number(profile.targetWeight)
            if (target && current) {
              const percentChange = Math.abs(target - current) / current
              if (percentChange > 0.4) {
                warnings.push(
                  'Target weight differs from current weight by more than 40% — this may be unrealistic',
                )
              }
              if (target < 30) {
                warnings.push(
                  'Target weight is below the recommended safety threshold',
                )
              }
            }
          } catch (err) {
            // ignore
          }
          return warnings
        })(),
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

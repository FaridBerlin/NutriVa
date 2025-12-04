import Profile from "../models/Profile.js";
import User from "../models/User.js";

export const completeProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists.",
      });
    }

    const { age, gender, height, weight, activityLevel, dietaryGoal } =
      req.body;

    const profile = await Profile.create({
      user: userId,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietaryGoal,
    });

    //we need to import User here - this is very important to be updated
    await User.findByIdAndUpdate(userId, { profileCompleted: true });

    res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: {
        profile: profile.toJSON(),
        nutritionTargets: {
          bmi: profile.bmi,
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories()
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "name email"
    );
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Profile.",
      data: {
        profile: profile.toJSON(),
        nutritionTargets: {
          bmi: profile.bmi,
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories()
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const profile = await Profile.findOneAndUpdate({ user: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        profile: profile.toJSON(),
        nutritionTargets: {
          bmi: profile.bmi,
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          targetCalories: profile.getDailyCalories()
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }
    await User.findByIdAndUpdate(userId, { profileCompleted: false });
    res.status(200).json({
      success: true,
      message: "User Profile deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

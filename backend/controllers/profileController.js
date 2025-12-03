import Profile from "../models/Profile.js";

export const testProfile = (req, res) => {
  // Manual async handling with try/catch
  Profile.findOne({ user: req.user._id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'No profile found. Create one first!'
        });
      }

      res.json({
        success: true,
        data: profile.toJSON(),
        calculations: {
          bmr: profile.bmr,
          tdee: profile.getTDEE(),
          dailyCalories: profile.getDailyCalories()
        }
      });
    })
    .catch(error => {
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    });
};



export const completeProfile = async (req, res) => {


  try {
    const existingProfile = await Profile.findOne({ user: req.user._id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists."
      });
    }

    const { age, gender, height, weight, activityLevel, dietaryGoal } = req.body;

    const profile = await Profile.create({
      user: req.user._id,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietaryGoal
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: profile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

  


export const getCurrentProfile = async (req, res) => {

};

export const updateProfile = async (req, res) => {

};

export const deleteProfile = async (req, res) => {

};
// src/pages/ProfilePage.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProfileForm from "../components/ProfileForm";

// import api from "../services/api";   // later use api to fetch profile data


export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات البروفايل
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      // setProfile(response.data);
      
    // Mock profile data for demonstration
      const mockProfile = {
        name: user?.name || "Ahmed",
        age: 25,
        gender: "male",
        height: 180,
        weight: 80,
        heightUnit: "cm",
        weightUnit: "kg",
        activityLevel: "moderate",
        dietaryPreference: "non-veg",
        mealsPerDay: 3,
        allergies: ["peanuts"],
        fitnessGoal: "lose",
        bmi: 24.7,
        bmr: 1850,
        tdee: 2870
      };
      
      setProfile(mockProfile);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  // leater calculate BMI
  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // later calculate BMI
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-500", bg: "bg-blue-50" };
    if (bmi < 25) return { text: "Normal", color: "text-primary", bg: "bg-green-50" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-500", bg: "bg-orange-50" };
    return { text: "Obese", color: "text-red-500", bg: "bg-red-50" };
  };

  //     ProfileForm editing state  
  if (isEditing) {
    return <ProfileForm initialData={profile} onCancel={() => setIsEditing(false)} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textLight">Loading profile...</p>
        </div>
      </div>
    );
  }

  // i can be imo or icon or avatar
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-textDark mb-4">
            Complete Your Profile
          </h2>
          <p className="text-textLight mb-6">
            Let's set up your nutrition profile to get personalized recommendations.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-8 py-3 bg-primary hover:bg-primaryDark text-white 
                       rounded-lg font-semibold transition-all shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const bmiCategory = getBMICategory(profile.bmi);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-textDark">
              Your Profile
            </h1>
            <p className="text-textLight mt-1">
              Manage your nutrition and fitness information
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-primary hover:bg-primaryDark text-white 
                       rounded-lg font-semibold transition-all shadow-md
                       flex items-center gap-2"
          >


             {/* // Edit icon */}
            <span>✏️</span> 
            Edit Profile
          </button>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <h2 className="text-2xl font-bold text-textDark">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📛</span>
              <div>
                <p className="text-sm text-textLight">Name</p>
                <p className="text-lg font-semibold text-textDark">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🎂</span>
              <div>
                <p className="text-sm text-textLight">Age</p>
                <p className="text-lg font-semibold text-textDark">{profile.age} years</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">{profile.gender === 'male' ? '👨' : profile.gender === 'female' ? '👩' : '🧑'}</span>
              <div>
                <p className="text-sm text-textLight">Gender</p>
                <p className="text-lg font-semibold text-textDark capitalize">{profile.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📏</span>
              <div>
                <p className="text-sm text-textLight">Height</p>
                <p className="text-lg font-semibold text-textDark">
                  {profile.height} {profile.heightUnit}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">⚖️</span>
              <div>
                <p className="text-sm text-textLight">Weight</p>
                <p className="text-lg font-semibold text-textDark">
                  {profile.weight} {profile.weightUnit}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">💪</span>
              <div>
                <p className="text-sm text-textLight">Activity Level</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {profile.activityLevel.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Metrics Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              📊
            </div>
            <h2 className="text-2xl font-bold text-textDark">Body Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BMI */}
            <div className={`p-6 ${bmiCategory.bg} rounded-xl border-l-4 border-primary`}>
              <p className="text-sm text-textLight mb-1">Body Mass Index</p>
              <p className="text-4xl font-bold text-textDark mb-2">{profile.bmi}</p>
              <p className={`text-lg font-semibold ${bmiCategory.color}`}>
                {bmiCategory.text}
              </p>
            </div>

            {/* BMR */}
            <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm text-textLight mb-1">Basal Metabolic Rate</p>
              <p className="text-4xl font-bold text-textDark mb-2">{profile.bmr}</p>
              <p className="text-sm text-textLight">calories/day</p>
            </div>

            {/* TDEE   Total Daily Energy Expenditure */}
            <div className="p-6 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <p className="text-sm text-textLight mb-1">Daily Calorie Need</p>
              <p className="text-4xl font-bold text-textDark mb-2">{profile.tdee}</p>
              <p className="text-sm text-textLight">calories/day</p>
            </div>
          </div>
        </div>

        {/* Diet & Goals Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primaryLight40 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-textDark">Diet & Fitness Goals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🍽️</span>
              <div>
                <p className="text-sm text-textLight">Dietary Preference</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {profile.dietaryPreference}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🍴</span>
              <div>
                <p className="text-sm text-textLight">Meals Per Day</p>
                <p className="text-lg font-semibold text-textDark">
                  {profile.mealsPerDay} meals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-sm text-textLight">Fitness Goal</p>
                <p className="text-lg font-semibold text-textDark capitalize">
                  {profile.fitnessGoal === 'lose' ? 'Lose Weight' :
                   profile.fitnessGoal === 'gain' ? 'Gain Weight' :
                   profile.fitnessGoal === 'muscle' ? 'Build Muscle' : 'Maintain'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-sm text-textLight">Allergies</p>
                {profile.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-textDark">None</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-textDark 
                       rounded-lg font-semibold transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}


// i want add lottie animation here later or icon 
//  Profile API Endpoints Needed

// ### GET /api/profile
// - Fetch logged-in user's profile
// - Return 404 if no profile exists

// ### POST /api/profile
// - Create new profile
// - Update User.profileCompleted = true
// - Validate all fields

// ### PUT /api/profile
// - Update existing profile
// - Validate changes

// ## Required Fields
// - age (Number, 13-120)
// - gender (String, "male"/"female")
// - height (Number, cm)
// - weight (Number, kg)
// - activityLevel (String, enum)
// - dietaryGoal (String, enum)

//  Notes
// - All routes require authentication (protect middleware)
// - Profile linked to User via user field
// - Return proper error messages
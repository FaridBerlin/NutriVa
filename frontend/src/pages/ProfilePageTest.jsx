import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function ProfilePageTest() {
  const navigate = useNavigate();
  const {
    profile,
    nutritionTargets,
    loading,
    error,
    createProfile,
    updateProfile,
    clearError,
    profileProgress,
  } = useProfile();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    dietaryGoal: "maintain_weight",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load existing profile data when editing
  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age || "",
        gender: profile.gender || "",
        height: profile.height || "",
        weight: profile.weight || "",
        activityLevel: profile.activityLevel || "sedentary",
        dietaryGoal: profile.dietaryGoal || "maintain_weight",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Convert string values to numbers
    const profileData = {
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
    };

    let result;
    if (profile) {
      result = await updateProfile(profileData);
    } else {
      result = await createProfile(profileData);
    }

    if (result.success) {
      setIsEditing(false);
      // Redirect to dashboard after profile creation
      if (!profile) {
        navigate("/dashboard");
      }
    }
  };

  // Show form if no profile exists or editing
  if (!profile || isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {profile ? "Update Your Profile" : "Complete Your Profile"}
            </h2>
            <p className="text-gray-600 mb-6">
              {profile
                ? "Update your information to get better recommendations"
                : "Tell us about yourself to get personalized nutrition recommendations"}
            </p>

            {profile && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Profile Progress</span>
                  <span>{profileProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${profileProgress}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="13"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Body Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    min="50"
                    max="300"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    min="20"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level *
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sedentary">
                    Sedentary (little/no exercise)
                  </option>
                  <option value="light">
                    Light (light exercise 1-3 days/week)
                  </option>
                  <option value="moderate">
                    Moderate (moderate exercise 3-5 days/week)
                  </option>
                  <option value="active">
                    Active (hard exercise 6-7 days/week)
                  </option>
                  <option value="very_active">
                    Very Active (very hard exercise & physical job)
                  </option>
                </select>
              </div>

              {/* Dietary Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Goal *
                </label>
                <select
                  name="dietaryGoal"
                  value={formData.dietaryGoal}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lose_weight">Lose Weight</option>
                  <option value="maintain_weight">Maintain Weight</option>
                  <option value="gain_weight">Gain Weight</option>
                  <option value="build_muscle">Build Muscle</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Saving..."
                    : profile
                    ? "Update Profile"
                    : "Complete Profile"}
                </button>

                {profile && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Show profile data
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Age:</span>
                  <span>{profile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span className="capitalize">{profile.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Height:</span>
                  <span>{profile.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>{profile.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">BMI:</span>
                  <span className="font-semibold">{nutritionTargets?.bmi}</span>
                </div>
              </div>
            </div>

            {/* Nutrition Targets */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Nutrition Targets</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Activity Level:</span>
                  <span className="capitalize">
                    {profile.activityLevel.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Goal:</span>
                  <span className="capitalize">
                    {profile.dietaryGoal.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">TDEE:</span>
                  <span>{nutritionTargets?.tdee} cal/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-blue-600">Daily Goal:</span>
                  <span className="font-semibold text-blue-600">
                    {nutritionTargets?.targetCalories} cal/day
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            🎉 Your profile is complete! You're all set to start tracking your
            nutrition.
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    // User Info
    name: "",
    email: "",
    
    // Profile Info
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    dietaryGoal: "",
    foodType: "",
  });

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/profile");
        
        if (response.data?.data) {
          const profile = response.data.data;
          setFormData({
            name: profile.user?.name || user?.name || "",
            email: profile.user?.email || user?.email || "",
            age: profile.age?.toString() || "",
            gender: profile.gender || "",
            height: profile.height?.toString() || "",
            weight: profile.weight?.toString() || "",
            activityLevel: profile.activityLevel || "",
            dietaryGoal: profile.dietaryGoal || "",
            foodType: profile.foodType || "",
          });
        }
      } catch (error) {
        console.log("No profile found");
        setFormData(prev => ({
          ...prev,
          name: user?.name || "",
          email: user?.email || "",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const profileData = {
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activityLevel: formData.activityLevel,
        dietaryGoal: formData.dietaryGoal,
        foodType: formData.foodType || undefined,
      };

      await api.put("/profile", profileData);
      // Navigate to profile page after successful save
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update profile ❌" });
    } finally {
      setIsSaving(false);
    }
  };

  // Activity Level Options
  const activityLevels = [
    { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
    { value: "light", label: "Light", desc: "Exercise 1-3 days/week" },
    { value: "moderate", label: "Moderate", desc: "Exercise 3-5 days/week" },
    { value: "active", label: "Active", desc: "Exercise 6-7 days/week" },
    { value: "very_active", label: "Very Active", desc: "Hard exercise daily" },
  ];

  // Dietary Goal Options
  const dietaryGoals = [
    { value: "lose_weight", label: "Lose Weight", icon: "📉" },
    { value: "maintain_weight", label: "Maintain Weight", icon: "⚖️" },
    { value: "gain_weight", label: "Gain Weight", icon: "📈" },
    { value: "build_muscle", label: "Build Muscle", icon: "💪" },
  ];

  // Food Type Options
  const foodTypes = [
    { value: "nonveg", label: "Non-Vegetarian", icon: "🍖" },
    { value: "veg", label: "Vegetarian", icon: "🥗" },
    { value: "vegan", label: "Vegan", icon: "🌱" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textLight">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primaryLight40 via-white to-primaryLight40 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-textDark mb-2">⚙️ Settings</h1>
          <p className="text-textLight">Manage your profile and preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <span>👤</span> Account Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-textLight mt-1">Contact support to change name</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-textLight mt-1">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <span>📋</span> Personal Information
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  min="13"
                  max="120"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Food Preference</label>
                <select
                  value={formData.foodType}
                  onChange={(e) => handleChange("foodType", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select preference</option>
                  {foodTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Body Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <span>📊</span> Body Metrics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  min="50"
                  max="300"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., 175"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  min="20"
                  max="500"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., 70"
                />
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <span>🏃</span> Activity Level
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleChange("activityLevel", level.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                    formData.activityLevel === level.value
                      ? "border-primary bg-primaryLight40 shadow-lg"
                      : "border-gray-200 hover:border-primary"
                  }`}
                >
                  <div className="font-semibold text-textDark text-sm">{level.label}</div>
                  <div className="text-xs text-textLight mt-1">{level.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Goal */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
              <span>🎯</span> Dietary Goal
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dietaryGoals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => handleChange("dietaryGoal", goal.value)}
                  className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                    formData.dietaryGoal === goal.value
                      ? "border-primary bg-primaryLight40 shadow-lg"
                      : "border-gray-200 hover:border-primary"
                  }`}
                >
                  <div className="text-3xl mb-2">{goal.icon}</div>
                  <div className="font-semibold text-textDark">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primaryDark hover:shadow-lg hover:scale-105"
              }`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </span>
              ) : (
                "Save Changes ✓"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

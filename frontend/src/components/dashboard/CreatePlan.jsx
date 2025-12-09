import {
  Sparkles,
  CheckCircle,
  UserCircle,
  ArrowRight,
  Wand2,
} from "lucide-react";

export default function CreatePlan({ profile, onGenerate }) {
  const features = [
    "Personalized meal plans for 30 days",
    "Calorie & macro breakdowns",
    "Recipe suggestions with ingredients",
    "Weekly shopping lists",
    "Progress tracking & adjustments",
  ];

  const profileInfo = [
    { label: "Goal", value: profile?.goal || "Weight Loss" },
    {
      label: "Daily Calories",
      value: profile?.dailyCalories
        ? `${profile.dailyCalories} kcal`
        : "2000 kcal",
    },
    { label: "Current BMI", value: profile?.bmi || "24.5" },
    { label: "Activity Level", value: profile?.activityLevel || "Moderate" },
    {
      label: "Duration",
      value: profile?.duration ? `${profile.duration} Days` : "30 Days",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-purple-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full mb-4">
          <Wand2 size={18} />
          <span className="font-semibold">AI-Powered</span>
        </div>
        <h2 className="text-3xl font-bold text-purple-900 mb-2">
          Create Your Personalized Plan
        </h2>
        <p className="text-purple-700">
          Let AI design a custom meal and fitness plan based on your goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* What You'll Get */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-purple-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">
              What You'll Get
            </h3>
          </div>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={18}
                />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Info */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="text-blue-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Your Info</h3>
          </div>
          <div className="space-y-3">
            {profileInfo.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between py-2 ${
                  index < profileInfo.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <span className="text-gray-600">{item.label}:</span>
                <span className="font-semibold text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={onGenerate}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-3"
        >
          <Sparkles size={22} />
          Generate My AI Plan
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}

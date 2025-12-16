import { useState } from "react";

export default function WaterTracker() {
  const dailyGoal = 2000; // الهدف اليومي لشرب الماء بالملليتر
  const [waterIntake, setWaterIntake] = useState(0); // كمية الماء التي تم شربها

  const handleAddWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, dailyGoal)); // منع تجاوز الهدف اليومي
  };

  const handleSubtractWater = (amount) => {
    setWaterIntake((prev) => Math.max(0, prev - amount)); // منع القيم السالبة
  };

  const isGoalReached = waterIntake >= dailyGoal; // تحقق إذا تم تحقيق الهدف

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-700">💧 Water Tracker</h2>
      <p className="text-lg text-blue-600">
        Today's Water Intake: {waterIntake} ml / {dailyGoal} ml
      </p>
      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleAddWater(250)}
        >
          +250ml
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleSubtractWater(250)}
        >
          -250ml
        </button>
      </div>
      {isGoalReached && (
        <div className="mt-4 text-green-600 font-bold">
          ✅ Goal Reached! Great job!
        </div>
      )}
    </div>
  );
}
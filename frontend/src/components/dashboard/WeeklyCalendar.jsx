import { useMemo } from 'react';

export default function WeeklyCalendar() {
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        isToday: date.toDateString() === today.toDateString()
      });
    }
    return days;
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">Weekly Calendar</h2>
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-6 rounded-xl transition-all cursor-pointer ${
                day.isToday
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium mb-2">{day.day}</span>
              <span className="text-3xl font-bold">{day.date}</span>
              <span className="text-xs mt-2">{day.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AuthContext import for user data
export default function DashboardHeader({ userName }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-primary to-primaryDark p-6 shadow-md rounded-b-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {userName}
          </h1>
          <p className="text-white/90 mt-1">{currentDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-white/90">
            <p className="text-sm">Daily Progress</p>
            <p className="text-lg font-semibold">72%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
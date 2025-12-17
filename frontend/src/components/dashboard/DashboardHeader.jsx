export default function DashboardHeader({ userName }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-gradient-to-r from-primary to-primaryDark p-6 shadow-md rounded-b-2xl">
      <div className="flex items-center justify-between">
        {/* Left: Weight (fixed 50kg, inline) */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/90">Weight</span>
          <span className="text-lg font-semibold text-white">50 kg</span>
        </div>

        {/* Right: Username + date */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-white">{userName}</h1>
          <p className="text-white/90 mt-1">{currentDate}</p>
        </div>
      </div>
    </div>
  )
}

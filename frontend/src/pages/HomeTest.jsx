function HomeTest() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-yellow-300">NutriVa</span>
        </h1>
        <p className="text-xl text-white/90 mb-8">Your nutrition companion</p>
        <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
          Start your journey now
        </button>
      </div>
    </div>
  );
}

export default HomeTest;

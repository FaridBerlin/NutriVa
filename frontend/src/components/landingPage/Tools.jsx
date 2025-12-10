export default function Tools() {
  return (
    <>
      <section className="py-20 px-6 sm:px-10 md:px-20 bg-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Everything You Need For Better Nutrition
          </h2>
          <p className="text-textLight text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Nutriva offers a complete suite of tools to help you understand and
            improve your diet
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                AI Diet Plans
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Get personalized meal plans created by advanced AI tailored to
                your unique goals and preferences
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Food Information
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Search and discover detailed nutritional information for
                thousands of foods and dishes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Health Guidance
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Receive expert dietary recommendations based on your specific
                health conditions and needs
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Progress Tracking
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Monitor your nutrition journey with comprehensive analytics and
                visual progress reports
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Cooking Guidance
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Learn optimal preparation methods and cooking techniques for
                healthier meals
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Smart Suggestions
              </h3>
              <p className="text-textLight text-sm leading-relaxed">
                Get intelligent meal recommendations and timing suggestions
                optimized for your lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

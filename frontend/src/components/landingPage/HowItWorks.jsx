export default function HowItWorks() {
  return (
    <>
      <section id="how-it-works" className="py-20 px-6 sm:px-10 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How Nutriva Works
          </h2>
          <p className="text-textLight text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Our AI-powered platform makes it easy to get personalized nutrition
            guidance in just a few simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Step 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-textDark mb-4">
                Tell Us About You
              </h3>
              <p className="text-textLight text-sm md:text-base leading-relaxed">
                Share your age, weight, height, activity level, and health goals
                to help us understand your needs
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-textDark mb-4">
                Get Your AI-Powered Plan
              </h3>
              <p className="text-textLight text-sm md:text-base leading-relaxed">
                Nutriva creates a personalized meal plan tailored to your unique
                body and lifestyle
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-textDark mb-4">
                Track & Thrive
              </h3>
              <p className="text-textLight text-sm md:text-base leading-relaxed">
                Follow your plan, monitor progress, and watch your health
                transform with real-time insights
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

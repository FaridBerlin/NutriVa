import Card from '../ui/Card'

export default function Testimonials() {
  return (
    <>
      <section
        id="testimonials"
        className="py-20 px-6 sm:px-10 md:px-20 bg-white/30"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What the world is saying
          </h2>
          <p className="text-textLight text-base md:text-lg mb-12 max-w-2xl mx-auto">
            Discover how Nutriva has helped people transform their health and
            nutrition habits
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial Card 1 */}
            <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-textDark">Sarah Johnson</h4>
                  <p className="text-sm text-textLight">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-textLight text-sm leading-relaxed italic">
                "Nutriva has completely transformed my approach to nutrition.
                The AI-powered meal plans are incredibly detailed and adapt to
                my fitness goals. I've lost 7kg in 3 months while maintaining my
                energy!"
              </p>
              <div className="flex mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </Card>

            {/* Testimonial Card 2 */}
            <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-textDark">Michael Chen</h4>
                  <p className="text-sm text-textLight">Working Professional</p>
                </div>
              </div>
              <p className="text-textLight text-sm leading-relaxed italic">
                "As someone with a busy schedule, Nutriva made healthy eating so
                easy. The personalized recommendations fit perfectly into my
                lifestyle, and I finally understand what my body needs."
              </p>
              <div className="flex mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </Card>

            {/* Testimonial Card 3 */}
            <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-textDark">Priya Sharma</h4>
                  <p className="text-sm text-textLight">Health Coach</p>
                </div>
              </div>
              <p className="text-textLight text-sm leading-relaxed italic">
                "I recommend Nutriva to all my clients. The AI recommendations
                are backed by solid nutritional science, and the customization
                options are unmatched. It's a game-changer!"
              </p>
              <div className="flex mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

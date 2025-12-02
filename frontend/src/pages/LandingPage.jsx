import HeroAnimation from "../components/HeroAnimation";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-20 gap-6 md:gap-10">
        {/* Left Text */}
        <div className="max-w-xl text-center md:text-left space-y-4 md:space-y-5">
          <h2 className="text-textLight text-base sm:text-lg md:text-xl font-medium tracking-wide">
            Transform Your Health with
          </h2>

          <h1 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Nutriva
          </h1>

          <p className="text-textLight text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            Track your meals, discover nutritious recipes, and achieve your
            wellness goals — all powered by smart AI. Nutriva learns your
            habits, adapts to your goals, and helps you make better food choices
            every day. Explore how Nutriva uses intelligent algorithms to tailor
            your nutrition plan to your body, lifestyle, and health goals.
          </p>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-textDark">
              Starting is the hard part. We make it easy with AI.
            </h3>
          </div>
        </div>

        {/* Right Animation */}
        <div className="hidden md:flex justify-center items-center scale-90 lg:scale-100">
          <HeroAnimation />
        </div>
      </div>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 sm:px-10 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* About Card 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Content coming soon...</span>
            </div>
            {/* About Card 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Content coming soon...</span>
            </div>
            {/* About Card 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Content coming soon...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 sm:px-10 md:px-20 bg-white/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial Card 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Testimonial coming soon...</span>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Testimonial coming soon...</span>
            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-8 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-400">Testimonial coming soon...</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 sm:px-10 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-400">FAQ coming soon...</span>
            </div>
            {/* FAQ Item 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-400">FAQ coming soon...</span>
            </div>
            {/* FAQ Item 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-400">FAQ coming soon...</span>
            </div>
            {/* FAQ Item 4 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-300 p-6 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-400">FAQ coming soon...</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

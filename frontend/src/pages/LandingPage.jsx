import { useNavigate } from "react-router-dom";
import HeroSection from "../components/landingPage/HeroSection";
import HowItWorks from "../components/landingPage/HowItWorks";
import Tools from "../components/landingPage/Tools";
import Testimonials from "../components/landingPage/Testimonials";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden">
      <HeroSection />
      <HowItWorks />
      {/* Everything You Need Section */}
      <Tools />
      <Testimonials />

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

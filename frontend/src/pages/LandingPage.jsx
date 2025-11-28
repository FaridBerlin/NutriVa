import NutrivaLogo from "../components/NutrivaLogo";
import HeroAnimation from "../components/HeroAnimation";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      
      {/* Logo */}
      <div className="absolute top-6 left-8 z-20">
        <NutrivaLogo />
      </div>

      {/* Hero Wrapper (Centered vertically without scroll) */}
      <div className="flex flex-col md:flex-row items-center justify-center h-full px-10 md:px-20 gap-10">
        
        {/* Left Text */}
        <div className="max-w-xl text-center md:text-left space-y-5">
          
          <h2 className="text-gray-600 text-lg md:text-xl font-medium tracking-wide">
            Transform Your Health with
          </h2>

          <h1 className="text-[#83D385] text-4xl md:text-5xl font-extrabold leading-tight">
            Nutriva
          </h1>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Track your meals, discover nutritious recipes, and achieve your
            wellness goals with our AI-powered nutrition companion.
          </p>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Starting is the hard part.
            </h3>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              We make it easy.
            </h3>
          </div>
        </div>

        {/* Right Animation */}
        <div className="hidden md:flex justify-center items-center scale-90">
          <HeroAnimation />
        </div>

      </div>

      {/* CTA Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          className="px-10 py-3 bg-[rgba(127,188,129,0.85)] hover:bg-[#69c86f] 
          text-lg font-semibold rounded-xl transition-all shadow-md"
        >
          Get Start
        </button>
      </div>
    </div>
  );
}


/**
 * ===========================
 *  LandingPage.jsx – Summary
 * ===========================
 *
 * This page is the main landing (hero) section of the project.
 * It displays the logo, marketing text, a hero animation, and a CTA button.
 *
 * 🔹 FILE NAME:
 *    /src/pages/LandingPage.jsx
 *
 * 🔹 COMPONENTS USED:
 *    1) NutrivaLogo.jsx    → located in /src/components/
 *    2) HeroAnimation.jsx  → located in /src/components/
 *
 * 🔹 STYLES:
 *    LandingPage.module.css → located in /src/pages/
 *
 * 🔹 IMAGES / ASSETS:
 *    No direct image imports here.
 *    (HeroAnimation component may use its own assets.)
 *
 * 🔹 NOTES FOR TEAM:
 *    - This page is full-screen (min-h-screen).
 *    - Do NOT remove `position: absolute` for the logo or CTA button.
 *    - Main text and animation are inside the hero section.
 *    - Keep component imports exactly as shown so the layout does not break.
 *
 * 🔹 PURPOSE:
 *    This is the first screen users see.
 *    It serves as the visual introduction to the Nutriva platform.
 */

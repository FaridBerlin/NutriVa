import HeroAnimation from "../components/HeroAnimation";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hero Wrapper (Centered vertically without scroll) */}
      <div className="flex flex-col md:flex-row items-center justify-center h-full px-6 sm:px-10 md:px-20 gap-6 md:gap-10">
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

      {/* CTA Button */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-20">
        <button
          onClick={() => navigate("/home")}
          className="px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 bg-primarySoft hover:bg-primary
          text-sm sm:text-base md:text-lg rounded-xl transition-all shadow-md"
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

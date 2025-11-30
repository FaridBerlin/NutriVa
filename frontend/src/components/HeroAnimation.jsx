import Lottie from "lottie-react";
import nutritionAnim from "../assets/animations/nutrition.json";

export default function HeroAnimation() {
  return (
    <div className="w-[650px] h-[700px] mt-60">
      <Lottie animationData={nutritionAnim} loop={true} />
    </div>
  );
}

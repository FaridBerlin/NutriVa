import Lottie from 'lottie-react'
import nutritionAnim from '../../assets/animations/nutrition.json'

export default function HeroAnimation() {
  return (
    <div className="min-w-[250px] max-w-[280px] sm:min-w-[300px] sm:max-w-[400px] md:min-w-[400px] md:max-w-[500px] lg:min-w-[500px] lg:max-w-[600px] h-auto mx-auto">
      <Lottie animationData={nutritionAnim} loop={true} />
    </div>
  )
}

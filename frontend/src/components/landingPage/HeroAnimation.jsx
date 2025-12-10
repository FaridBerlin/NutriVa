import Lottie from 'lottie-react'
import nutritionAnim from '../../assets/animations/nutrition.json'

export default function HeroAnimation() {
  return (
    <div className="w-[400px] h-[450px]">
      <Lottie animationData={nutritionAnim} loop={true} />
    </div>
  )
}

import Lottie from 'lottie-react'
import nutritionAnim from '../../assets/animations/nutrition.json'

export default function HeroAnimation() {
  return (
    <div className="w-[600px] h-[350px]">
      <Lottie animationData={nutritionAnim} loop={true} />
    </div>
  )
}

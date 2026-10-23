import { useRef } from 'react'
import {
  LottieLight,
  LottieSubscription,
  type LottieHandle,
} from 'lottie-react'
import nutritionAnim from '../../assets/animations/nutrition.json'

export default function HeroAnimation() {
  const lottieRef = useRef<LottieHandle>(null)

  // lottie-react v3 honours prefers-reduced-motion by not autoplaying. This
  // animation's first frame is empty, so show a fully drawn still instead of
  // a blank hero for those visitors.
  const showStillIfReducedMotion = () => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      lottieRef.current?.seek({ percent: 50 })
    }
  }

  return (
    <div className="min-w-[250px] max-w-[280px] sm:min-w-[300px] sm:max-w-[400px] md:min-w-[400px] md:max-w-[500px] lg:min-w-[500px] lg:max-w-[600px] h-auto mx-auto">
      <LottieLight
        src={nutritionAnim}
        lottieRef={lottieRef}
        subscriptions={{ [LottieSubscription.ready]: showStillIfReducedMotion }}
        className="aspect-video w-full"
        autoplay
        loop
      />
    </div>
  )
}

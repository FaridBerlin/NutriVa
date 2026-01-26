import HeroAnimation from './HeroAnimation'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-6 sm:px-10 md:px-20 gap-6 md:gap-5">
      {/* Left Text */}
      <ScrollAnimationWrapper
        direction="left"
        className="max-w-xl text-center md:text-left space-y-4 md:space-y-5"
      >
        <h1 className="text-textDark dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-primary dark:text-teal-400">Nutri</span>tion{' '}
          <br />
          Meets <br /> Inno
          <span className="text-primary dark:text-teal-400">Va</span>tion{' '}
          <span className="text-emerald-500 text-xl">🍃</span>
        </h1>

        <p className="text-textLight dark:text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          Where smart AI meets personalized nutrition.
          <br />
          <span className="text-primary font-semibold dark:text-teal-400">
            {' '}
            NutriVa
          </span>{' '}
          adapts to your goals, and transforms how you eat—making every meal
          healthier and uniquely yours.
        </p>
      </ScrollAnimationWrapper>

      {/* Right Animation */}
      <ScrollAnimationWrapper
        direction="right"
        className="flex justify-center items-center scale-75 sm:scale-90 lg:scale-100"
      >
        <HeroAnimation />
      </ScrollAnimationWrapper>
    </div>
  )
}

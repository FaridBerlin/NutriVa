import HeroAnimation from './HeroAnimation'

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 md:px-20 gap-6 md:gap-10">
      {/* Left Text */}
      <div className="max-w-xl text-center md:text-left space-y-4 md:space-y-5">
        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-primary">Nutri</span>tion <br></br>Meets{' '}
          <br></br> Inno
          <span className="text-primary">Va</span>tion
        </h1>

        <p className="text-textLight text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          Where smart AI meets personalized nutrition.
          <br></br>
          <span className="text-primary font-semibold"> NutriVa</span> adapts to
          your goals, and transforms how you eat—making every meal healthier and
          uniquely yours.
        </p>
      </div>

      {/* Right Animation */}
      <div className="hidden md:flex justify-center items-center scale-90 lg:scale-100">
        <HeroAnimation />
      </div>
    </div>
  )
}

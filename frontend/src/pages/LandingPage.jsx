import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/landingPage/HeroSection'
import HowItWorks from '../components/landingPage/HowItWorks'
import Tools from '../components/landingPage/Tools'
import Testimonials from '../components/landingPage/Testimonials'
import FAQ from '../components/landingPage/FAQ'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full overflow-hidden">
      <HeroSection />
      <HowItWorks />
      <Tools />
      <Testimonials />
      <FAQ />
    </div>
  )
}

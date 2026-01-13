import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Calculator,
  Clock,
  BookOpen,
  TrendingUp,
  Heart,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'

export default function Tools() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%'])

  const problemSolutions = [
    {
      icon: Target,
      problem: "Don't know how many calories you need?",
      solution:
        'Get precise calorie targets based on your body, goals, and activity level',
      color: 'from-red-400 to-pink-500',
    },
    {
      icon: Calculator,
      problem: 'Confused about macros and nutrition?',
      solution:
        'Automatic macro calculations with balanced protein, carbs, and fats',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Clock,
      problem: 'No time to plan meals every week?',
      solution: 'Generate complete weekly meal plans in seconds with AI',
      color: 'from-green-400 to-teal-500',
    },
    {
      icon: BookOpen,
      problem: 'Lose track of what you ate?',
      solution: 'Simple meal tracking to monitor your daily nutrition intake',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      icon: TrendingUp,
      problem: 'Not seeing results from your diet?',
      solution: 'Visual progress tracking and analytics to stay motivated',
      color: 'from-orange-400 to-red-500',
    },
    {
      icon: Heart,
      problem: 'Diets that ignore your preferences?',
      solution:
        'Customized plans that respect your dietary choices and allergies',
      color: 'from-pink-400 to-rose-500',
    },
  ]

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-br from-white via-gray-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full mb-8 shadow-xl"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-semibold">Smart Solutions</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            From Confusion to
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
              Crystal Clear Nutrition
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            We turn your biggest diet challenges into effortless wins
          </p>
        </ScrollAnimationWrapper>

        {/* Two Column Layout with Connecting Line */}
        <div className="relative">
          {/* Scroll-Animated Connecting Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200/30 dark:bg-teal-800/30 rounded-full hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-teal-400 to-green-400 dark:from-teal-600 dark:to-green-600 rounded-full origin-top"
            />
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12">
            {/* Problems Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center md:text-left">
                The Challenges
              </h3>
              <div className="space-y-6">
                {problemSolutions.map((item, index) => {
                  const IconComponent = item.icon
                  const isHovered = hoveredIndex === index

                  return (
                    <motion.div
                      key={`problem-${index}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer min-h-[140px] flex items-center"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                            Challenge
                          </h4>
                          <p className="text-gray-900 dark:text-gray-200 text-base font-medium leading-relaxed">
                            {item.problem}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Middle Spacer for Line */}
            <div className="hidden md:block w-16"></div>

            {/* Solutions Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center md:text-right">
                Our Solutions
              </h3>
              <div className="space-y-6">
                {problemSolutions.map((item, index) => {
                  const isHovered = hoveredIndex === index

                  return (
                    <motion.div
                      key={`solution-${index}`}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        x: isHovered ? -5 : 0,
                      }}
                      className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/30 dark:to-green-900/30 rounded-xl p-6 shadow-lg border border-teal-200 dark:border-teal-700/50 transition-all duration-300 min-h-[140px] flex items-center"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-700/50 flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider">
                            Solution
                          </h4>
                          <p className="text-gray-900 dark:text-gray-200 text-base font-semibold leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollAnimationWrapper delay={0.6} className="mt-20 text-center">
          <p className="text-gray-900 dark:text-gray-300 mb-8 text-xl font-medium">
            Stop overthinking. Start achieving.
          </p>
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(20, 184, 166, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-teal-500 via-teal-600 to-green-500 text-white rounded-2xl font-bold text-lg shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">
              Transform Your Nutrition Now →
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}

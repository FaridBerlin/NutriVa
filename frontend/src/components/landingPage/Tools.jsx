import { ArrowRight, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'

export default function Tools() {
  const problemSolutions = [
    {
      problem: "Don't know how many calories you need?",
      solution:
        'Get precise calorie targets based on your body, goals, and activity level',
      gradient: 'from-primary/80 via-primary to-primaryDark',
      gradientDark: 'from-teal-700/60 via-teal-600/70 to-teal-700/60',
      delay: 0,
    },
    {
      problem: 'Confused about macros and nutrition?',
      solution:
        'Automatic macro calculations with balanced protein, carbs, and fats',
      gradient: 'from-primary/90 via-primary to-primaryDark',
      gradientDark: 'from-emerald-700/60 via-emerald-600/70 to-emerald-700/60',
      delay: 0.1,
    },
    {
      problem: 'No time to plan meals every week?',
      solution: 'Generate complete weekly meal plans in seconds with AI',
      gradient: 'from-primary via-primaryDark to-primary',
      gradientDark: 'from-teal-700/60 via-teal-600/70 to-teal-700/60',
      delay: 0.2,
    },
    {
      problem: 'Lose track of what you ate?',
      solution: 'Simple meal tracking to monitor your daily nutrition intake',
      gradient: 'from-primary/90 via-primary to-primaryDark',
      gradientDark: 'from-emerald-700/60 via-emerald-600/70 to-emerald-700/60',
      delay: 0.3,
    },
    {
      problem: 'Not seeing results from your diet?',
      solution: 'Visual progress tracking and analytics to stay motivated',
      gradient: 'from-primaryDark via-primary/90 to-primary',
      gradientDark: 'from-teal-700/60 via-teal-600/70 to-teal-700/60',
      delay: 0.4,
    },
    {
      problem: 'Diets that ignore your preferences?',
      solution:
        'Customized plans that respect your dietary choices and allergies',
      gradient: 'from-primary via-primary to-primaryDark/90',
      gradientDark: 'from-emerald-700/60 via-emerald-600/70 to-emerald-700/60',
      delay: 0.5,
    },
  ]

  return (
    <>
      <section className="py-20 px-6 sm:px-10 md:px-20 bg-white/20 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <ScrollAnimationWrapper className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary dark:bg-teal-600 text-white rounded-full mb-8 shadow-xl"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-semibold">Smart Solutions</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-textDark dark:text-gray-100 mb-6 leading-tight">
              From Confusion to
              <br />
              <span className="text-primary dark:text-teal-400">
                Crystal Clear Nutrition
              </span>
            </h2>
            <p className="text-textLight dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              We turn your biggest diet challenges into effortless wins
            </p>
          </ScrollAnimationWrapper>

          {/* Problem/Solution Flow */}
          <div className="space-y-8">
            {problemSolutions.map((item, index) => (
              <ScrollAnimationWrapper
                key={index}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="relative"
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Problem Side */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <p className="text-textDark dark:text-gray-200 text-lg font-medium leading-relaxed relative z-10">
                      {item.problem}
                    </p>
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full blur-2xl opacity-50"></div>
                  </motion.div>

                  {/* Arrow Connector */}
                  <motion.div
                    animate={{
                      x: [0, index % 2 === 0 ? 10 : -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex-shrink-0 relative"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.gradient} dark:bg-gradient-to-r dark:${item.gradientDark} flex items-center justify-center shadow-lg`}
                    >
                      <ArrowRight
                        className={`w-6 h-6 text-white dark:text-gray-900 ${index % 2 === 0 ? '' : 'rotate-180'}`}
                      />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.gradient} dark:bg-gradient-to-r dark:${item.gradientDark} blur-xl`}
                    ></motion.div>
                  </motion.div>

                  {/* Solution Side */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`flex-1 bg-gradient-to-r ${item.gradient} dark:bg-gradient-to-r dark:${item.gradientDark} rounded-2xl p-8 shadow-xl relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-white/10 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <p className="text-white dark:text-gray-900 text-lg font-semibold leading-relaxed relative z-10">
                      {item.solution}
                    </p>
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 dark:bg-black/10 rounded-full blur-2xl"></div>
                  </motion.div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollAnimationWrapper delay={0.4} className="mt-20 text-center">
            <p className="text-textDark dark:text-gray-300 mb-8 text-xl font-medium">
              Stop overthinking. Start achieving.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(131, 211, 133, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-primary via-primaryDark to-primary dark:from-teal-700 dark:via-teal-600 dark:to-teal-700 text-white rounded-2xl font-bold text-lg shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">
                Transform Your Nutrition Now →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primaryDark via-primary to-primaryDark dark:from-teal-800 dark:via-teal-700 dark:to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  )
}

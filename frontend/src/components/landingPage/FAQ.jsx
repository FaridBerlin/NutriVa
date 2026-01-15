import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ScrollAnimationWrapper from './ScrollAnimationWrapper'

const faqs = [
  {
    question: 'How does the AI meal planner work?',
    answer:
      'Our AI analyzes your profile, including your fitness goals, dietary preferences, activity level, and any restrictions. It then generates personalized meal plans optimized for your caloric and macro needs, with recipes that match your taste preferences and lifestyle.',
  },
  {
    question: 'Is Nutriva suitable for specific diets?',
    answer:
      'Absolutely! Nutriva supports various dietary preferences including vegetarian, vegan,  Mediterranean, and more. You can also specify food allergies and intolerances, and the AI will exclude those ingredients from your meal plans.',
  },
  {
    question: 'How accurate is the nutrition tracking?',
    answer:
      'Very accurate! We use a comprehensive food database with detailed nutritional information verified by nutrition experts. You can track macros (protein, carbs, fats), micronutrients, calories, and more with precision. Our barcode scanner also makes logging packaged foods instant and accurate.',
  },
  {
    question: 'Can I customize the generated meal plans?',
    answer:
      'Yes! While our AI creates optimized meal plans, you have full control to swap meals, adjust portions, or create your own recipes. The app automatically recalculates your daily nutrition totals when you make changes.',
  },
  {
    question: 'Do I need to count calories manually?',
    answer:
      "Not at all! Nutriva automates calorie and macro tracking. Simply log your meals (or follow your AI-generated plan), and the app tracks everything for you. You'll see real-time progress toward your daily goals with intuitive visual indicators.",
  },
  {
    question: 'Is there a mobile app?',
    answer:
      "Nutriva is a responsive web application that works beautifully on all devices - desktop, tablet, and mobile. You can access it from any browser, and we're currently developing native iOS and Android apps for an even better mobile experience.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const navigate = useNavigate()
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-0 w-80 h-80 bg-primary dark:bg-teal-600/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/6 right-0 w-64 h-64 bg-primary dark:bg-emerald-600/10 rounded-full blur-3xl"
        ></motion.div>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary dark:bg-teal-900/30 dark:text-teal-400 rounded-full mb-6">
              <span className="text-sm font-medium">Got Questions?</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-textDark dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-textLight dark:text-gray-400">
              Everything you need to know about Nutriva
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <ScrollAnimationWrapper
              key={index}
              delay={index * 0.1}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-primary dark:hover:border-teal-500 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-textDark dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary dark:text-teal-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-textLight dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                  {faq.answer}
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollAnimationWrapper delay={0.3}>
          <div className="bg-gradient-to-br from-primary/5 to-teal-50/50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-primary/20 dark:border-teal-700/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-textDark dark:text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-textLight dark:text-gray-400">
                Our support team is here to help you get started
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary hover:bg-primaryDark dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Email Support
              </button>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <ScrollAnimationWrapper delay={0.4}>
          <div className="bg-gradient-to-br from-primary to-primaryDark dark:from-teal-700 dark:to-emerald-700 rounded-3xl p-12 text-center text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Nutrition?
              </h2>
              <p className="text-xl text-green-50 dark:text-teal-50 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are achieving their health goals
                with Nutriva's AI-powered platform
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white text-primary hover:bg-green-50 dark:text-teal-700 dark:hover:bg-teal-50 rounded-xl transition-all shadow-lg font-semibold cursor-pointer"
                >
                  Start Free
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { ChevronDown, Mail, MessageCircle } from 'lucide-react'

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-6">
            <span className="text-sm font-medium">Got Questions?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Nutriva
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-emerald-300 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600">
              Our support team is here to help you get started
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-grye-50 text-gray-700 rounded-xl hover:bg-emerald-500 transition-all border border-gray-200 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Support
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Nutrition?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are achieving their health goals with
              Nutriva's AI-powered platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all shadow-lg font-semibold">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

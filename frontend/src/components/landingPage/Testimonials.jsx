import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitch',
    role: 'Fitness Enthusiast',
    image: '👩‍💼',
    rating: 5,
    text: "Nutriva has completely transformed how I approach nutrition. The AI meal plans are so easy to follow and actually fit my lifestyle. I've lost 15 pounds in 3 months!",
    highlight: 'Lost 15 pounds in 3 months',
  },
  {
    name: 'Lisa Johnson',
    role: 'Working Mom',
    image: '👩‍👧',
    rating: 5,
    text: "Between work and kids, I struggled with healthy eating. Nutriva's meal plans are family-friendly and the shopping list feature saves me so much time!",
    highlight: 'Whole family eats healthier',
  },
  {
    name: 'Suganda Wilson',
    role: 'Weight Loss Journey',
    image: '💪',
    rating: 4,
    text: 'Down 40 pounds and feeling amazing! Nutriva made it sustainable by showing me how to eat foods I love while hitting my goals. The progress tracking keeps me motivated.',
    highlight: 'Down 40 pounds',
  },
  {
    name: 'Marwa Rodriguez',
    role: 'Health Coach',
    image: '👩‍⚕️',
    rating: 5,
    text: "I recommend Nutriva to all my clients. The macro tracking is precise, the interface is beautiful, and the AI recommendations are genuinely helpful. It's a game-changer!",
    highlight: 'Recommends to clients',
  },
  {
    name: 'Farid Thompson',
    role: 'Athlete',
    image: '🏃‍♂️',
    rating: 4,
    text: 'The ability to customize meal plans based on my training schedule is incredible. Nutriva helps me fuel my workouts properly and track every macro with ease.',
    highlight: 'Improved performance by 20%',
  },
  {
    name: 'Anas Chen',
    role: 'Busy Professional',
    image: '👨‍💻',
    rating: 4,
    text: 'As someone with a hectic schedule, Nutriva makes meal planning effortless. The app does all the thinking for me, and I love seeing my progress visualized so clearly.',
    highlight: 'Saves 5 hours per week',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-6">
            <span className="text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by Thousands of Users
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of health-conscious individuals achieving their
            goals with Nutriva
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-emerald-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full mb-6">
                <span className="text-xs font-medium">
                  {testimonial.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">50,000+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">2M+</div>
            <div className="text-gray-600">Meals Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  )
}

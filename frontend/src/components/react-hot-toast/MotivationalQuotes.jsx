import toast from 'react-hot-toast'

const quotes = [
  "Progress over perfection. Show up anyway.",
    "Your only competition is who you were yesterday.",
    "Comfort is the enemy of growth.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Small steps daily beat giant steps never.",
    "Your mind gives up before your body does. Don't listen.",
    "Weak is temporary. Quitting is permanent.",
    "Build the habit. The results will follow.",
    "Sweat is just your weakness leaving your body.",
    "You don't rise to the level of your goals. You fall to the level of your habits.",
    "Effort is the bridge between where you are and where you want to be.",
    "Doubt kills more dreams than failure ever will.",
    "Your potential is unlimited. Your excuses are not.",
    "Do it now. Thank yourself later.",
    "The best time to start was yesterday. The second best time is now."
]

// Get a random quote from the list
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}

// Show a motivational toast notification
export const showMotivationalToast = () => {
  const quote = getRandomQuote()

  // Dismiss all existing toasts first
  toast.dismiss()

  toast(quote, {
    duration: 6000,
    position: 'top-center',
    icon: '💪',
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
      fontWeight: '500',
      maxWidth: '500px',
      textAlign: 'center',
    },
  })
}

export default quotes

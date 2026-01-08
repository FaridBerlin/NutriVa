export default function NutrivaLogo({ size = 'sm' }) {
  const sizeClasses = {
    sm: 'h-20',
    md: 'h-24',
    lg: 'h-28',
    xl: 'h-32',
  }

  return (
    <div className="flex items-center gap-1 select-none">
      <svg
        className={`${sizeClasses[size] || sizeClasses.sm} w-auto`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Circle Background */}
        <circle cx="100" cy="100" r="95" fill="url(#gradient1)" />

        {/* Leaf/Nutrition Symbol */}
        <path
          d="M100 45 C85 45, 75 55, 75 70 C75 85, 85 95, 100 100 C115 95, 125 85, 125 70 C125 55, 115 45, 100 45 Z"
          fill="white"
          opacity="0.3"
        />

        {/* Stylized N with Leaf Integration */}
        <path
          d="M70 60 L70 140 L80 140 L80 85 L120 140 L130 140 L130 60 L120 60 L120 115 L80 60 L70 60 Z"
          fill="white"
        />

        {/* AI Circuit Dots */}
        <circle cx="145" cy="70" r="4" fill="white" opacity="0.8" />
        <circle cx="155" cy="85" r="3" fill="white" opacity="0.6" />
        <circle cx="150" cy="100" r="3.5" fill="white" opacity="0.7" />

        {/* Connection Lines (AI feel) */}
        <line
          x1="145"
          y1="70"
          x2="155"
          y2="85"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <line
          x1="155"
          y1="85"
          x2="150"
          y2="100"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: '#10b981', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#0d9488', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

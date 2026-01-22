import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

export default function StatsCard({
  icon: Icon,
  value,
  title,
  colorScheme = 'blue', // 'blue', 'indigo', 'orange', 'emerald'
  animationDelay = '0ms',
  children,
}) {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  // Color schemes
  const colorSchemes = {
    blue: {
      glow: isDark ? 'bg-amber-500' : 'bg-blue-400',
      iconBg: isDark
        ? 'bg-amber-500/20'
        : 'bg-gradient-to-br from-blue-400 to-cyan-500',
      iconColor: isDark ? 'text-amber-400' : 'text-white',
    },
    indigo: {
      glow: isDark ? 'bg-amber-500' : 'bg-indigo-400',
      iconBg: isDark
        ? 'bg-amber-500/20'
        : 'bg-gradient-to-br from-indigo-400 to-purple-500',
      iconColor: isDark ? 'text-amber-400' : 'text-white',
    },
    orange: {
      glow: isDark ? 'bg-amber-500' : 'bg-orange-400',
      iconBg: isDark
        ? 'bg-amber-500/20'
        : 'bg-gradient-to-br from-orange-400 to-red-500',
      iconColor: isDark ? 'text-amber-400' : 'text-white',
    },
    emerald: {
      glow: isDark ? 'bg-amber-500' : 'bg-emerald-400',
      iconBg: isDark
        ? 'bg-amber-500/20'
        : 'bg-gradient-to-br from-emerald-400 to-teal-500',
      iconColor: isDark ? 'text-amber-400' : 'text-white',
    },
  }

  const colors = colorSchemes[colorScheme] || colorSchemes.blue
  const textPrimary = isDark ? 'text-accentYellow' : 'text-gray-900'
  const textSecondary = isDark ? 'text-accentYellow/70' : 'text-gray-600'
  const textMuted = isDark ? 'text-accentYellow/50' : 'text-gray-500'

  return (
    <div className="relative p-6">
      {/* Decorative Background Element */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 ${colors.glow} group-hover:opacity-30 transition-opacity duration-500`}
      />

      <div className="relative">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`${colors.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={colors.iconColor} size={24} />
          </div>
          <span
            className={`text-4xl font-black ${textPrimary} tracking-tighter`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {value}
          </span>
        </div>

        <h3 className={`text-sm font-semibold ${textSecondary} mb-4`}>
          {title}
        </h3>

        {/* Content (progress, controls, info) */}
        {typeof children === 'function'
          ? children({ textMuted, isDark })
          : children}
      </div>
    </div>
  )
}

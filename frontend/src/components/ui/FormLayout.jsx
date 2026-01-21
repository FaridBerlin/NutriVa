export default function FormLayout({
  title,
  children,
  footer,
  compact = false,
  center = false,
  accent = false,
  className = '',
  titleClass = '',
  footerClass = '',
}) {
  const wrapperPadding = compact ? 'p-6' : 'p-8'
  const centerClasses = center
    ? 'flex items-center justify-center min-h-[50vh]'
    : ''
  const accentClass = accent ? 'nv-form-accent' : ''

  return (
    <div
      className={`max-w-3xl mx-auto px-6 py-8 ${centerClasses} ${className}`}
    >
      <div
        className={`nv-card rounded-2xl shadow-md ${wrapperPadding} w-full ${accentClass}`}
      >
        {title && (
          <h1 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h1>
        )}

        <div className="nv-form">{children}</div>

        {footer && (
          <div
            className={`mt-6 text-sm text-black dark:text-muted ${footerClass}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

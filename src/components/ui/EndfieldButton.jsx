/**
 * ============================================================================
 * EndfieldButton Component
 * ============================================================================
 * Button dengan gaya Sci-Fi Brutalist - Flat, Sharp, Glow on hover
 * No rounded corners, flat design with tactical accent border
 * ============================================================================
 */

export default function EndfieldButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) {
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    font-mono
    font-bold
    uppercase
    tracking-widest
    transition-all
    duration-300
    border
    clip-beveled-sm
  `;

  const variants = {
    primary: `
      bg-transparent
      text-endfieldAccent
      border-endfieldAccent
      hover:bg-endfieldAccent
      hover:text-endfieldBg
      hover:shadow-[0_0_15px_rgba(255,69,0,0.5)]
      active:bg-endfieldAccentHover
    `,
    secondary: `
      bg-endfieldPanel
      text-endfieldText
      border-endfieldBorder
      hover:border-endfieldAccent
      hover:text-endfieldAccent
      active:bg-endfieldSurface
    `,
    ghost: `
      bg-transparent
      text-endfieldTextMuted
      border-transparent
      hover:text-endfieldText
      hover:border-endfieldBorder
      active:text-endfieldAccent
    `,
    danger: `
      bg-transparent
      text-endfieldError
      border-endfieldError
      hover:bg-endfieldError
      hover:text-endfieldBg
      hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]
      active:opacity-90
    `,
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabledStyles}
        ${className}
      `}
    >
      {/* Corner accent for primary variant */}
      {variant === 'primary' && (
        <>
          <span className="absolute top-0 left-0 w-2 h-[1px] bg-current opacity-50" />
          <span className="absolute top-0 left-0 w-[1px] h-2 bg-current opacity-50" />
        </>
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  );
}

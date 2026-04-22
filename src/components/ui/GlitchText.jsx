/**
 * ============================================================================
 * GlitchText Component
 * ============================================================================
 * Text dengan efek RGB split glitch saat di-hover
 * Gaya Sci-Fi Brutalist dengan warna merah/biru yang bergeser
 * ============================================================================
 */

'use client';

export default function GlitchText({
  text,
  as: Component = 'span',
  className = '',
  glitchOnHover = true,
}) {
  return (
    <Component
      className={`
        relative
        inline-block
        font-sans
        font-bold
        uppercase
        tracking-wider
        ${glitchOnHover ? 'group cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Base text - White/Primary */}
      <span
        className={`
          relative
          z-10
          text-endfieldText
          ${glitchOnHover ? 'group-hover:opacity-0 transition-opacity duration-75' : ''}
        `}
      >
        {text}
      </span>

      {glitchOnHover && (
        <>
          {/* Red channel - shifted right */}
          <span
            className="
              absolute
              inset-0
              left-[2px]
              -z-10
              text-red-500
              font-sans
              font-bold
              uppercase
              tracking-wider
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-75
              animate-pulse
            "
            style={{ mixBlendMode: 'screen' }}
          >
            {text}
          </span>

          {/* Blue channel - shifted left */}
          <span
            className="
              absolute
              inset-0
              -left-[2px]
              -z-10
              text-blue-500
              font-sans
              font-bold
              uppercase
              tracking-wider
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-75
              delay-75
              animate-pulse
            "
            style={{ mixBlendMode: 'screen' }}
          >
            {text}
          </span>

          {/* Glitch overlay - white flash */}
          <span
            className="
              absolute
              inset-0
              -z-5
              text-white
              font-sans
              font-bold
              uppercase
              tracking-wider
              opacity-0
              group-hover:opacity-80
              transition-opacity
              duration-100
              group-hover:animate-glitch
            "
            style={{ mixBlendMode: 'overlay' }}
          >
            {text}
          </span>

          {/* Scan line effect */}
          <span
            className="
              absolute
              inset-0
              -z-20
              bg-gradient-to-b
              from-transparent
              via-endfieldAccent/20
              to-transparent
              h-2
              w-full
              opacity-0
              group-hover:opacity-100
              group-hover:animate-scan
            "
          />
        </>
      )}
    </Component>
  );
}

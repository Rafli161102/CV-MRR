/**
 * ============================================================================
 * EndfieldCard Component
 * ============================================================================
 * Container dengan gaya Sci-Fi Brutalist - HUD Panel
 * Menggunakan clip-path untuk sudut diagonal
 * ============================================================================
 */

export default function EndfieldCard({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-endfieldPanel border-endfieldBorder',
    elevated: 'bg-endfieldElevated border-endfieldBorderActive',
    surface: 'bg-endfieldSurface border-endfieldBorder',
  };

  return (
    <div
      className={`
        relative
        p-6
        clip-beveled
        border
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      {/* HUD Corner Accent - Top Left */}
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-endfieldAccent" />
      <div className="absolute top-0 left-0 w-[2px] h-8 bg-endfieldAccent" />
      
      {/* HUD Corner Accent - Bottom Right (subtle) */}
      <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-endfieldBorderActive" />
      <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-endfieldBorderActive" />
      
      {/* Technical pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

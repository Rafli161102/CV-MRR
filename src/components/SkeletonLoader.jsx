/**
 * ============================================================================
 * Skeleton Loader Component
 * ============================================================================
 * Loading placeholder dengan tema Endfield Brutalist.
 * ============================================================================
 */

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-endfieldPanel border border-endfieldBorder p-6 animate-pulse ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-endfieldSurface" />
        <div className="w-16 h-6 bg-endfieldSurface" />
      </div>
      <div className="w-3/4 h-6 bg-endfieldSurface mb-2" />
      <div className="w-1/2 h-4 bg-endfieldSurface mb-4" />
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 bg-endfieldSurface" />
        <div className="w-full h-3 bg-endfieldSurface" />
        <div className="w-2/3 h-3 bg-endfieldSurface" />
      </div>
      <div className="w-full h-10 bg-endfieldSurface mt-auto" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-endfieldSurface"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonHero({ className = '' }) {
  return (
    <div className={`flex flex-col items-center animate-pulse ${className}`}>
      <div className="w-64 h-4 bg-endfieldSurface mb-8" />
      <div className="w-96 h-24 bg-endfieldSurface mb-6" />
      <div className="w-48 h-6 bg-endfieldSurface mb-8" />
      <div className="w-32 h-1 bg-endfieldSurface mb-12" />
      <div className="flex gap-4">
        <div className="w-40 h-12 bg-endfieldSurface" />
        <div className="w-40 h-12 bg-endfieldSurface" />
      </div>
    </div>
  );
}

export function SkeletonTimeline({ items = 3, className = '' }) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="w-48 h-6 bg-endfieldSurface mb-8" />
      {[...Array(items)].map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="w-3 h-3 bg-endfieldAccent mt-2 flex-shrink-0" />
          <div className="flex-1 bg-endfieldPanel border border-endfieldBorder p-4">
            <div className="flex justify-between mb-3">
              <div className="w-32 h-4 bg-endfieldSurface" />
              <div className="w-20 h-4 bg-endfieldSurface" />
            </div>
            <div className="w-3/4 h-5 bg-endfieldSurface mb-2" />
            <div className="w-full h-3 bg-endfieldSurface" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default {
  SkeletonCard,
  SkeletonText,
  SkeletonHero,
  SkeletonTimeline,
  SkeletonGrid,
};

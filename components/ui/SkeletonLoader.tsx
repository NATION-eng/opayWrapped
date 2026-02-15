interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'section'
  count?: number
}

export default function SkeletonLoader({ 
  variant = 'section',
  count = 1
}: SkeletonLoaderProps) {
  
  if (variant === 'card') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="h-40 bg-white/10 rounded-2xl animate-pulse"
            aria-label="Loading card"
          />
        ))}
      </div>
    )
  }
  
  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="h-4 bg-white/10 rounded animate-pulse"
            style={{ width: `${Math.random() * 30 + 70}%` }}
            aria-label="Loading text"
          />
        ))}
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-6 w-full max-w-4xl px-4">
        {/* Title skeleton */}
        <div className="h-12 bg-white/10 rounded w-3/4 mx-auto" />
        
        {/* Subtitle skeleton */}
        <div className="h-6 bg-white/10 rounded w-1/2 mx-auto" />
        
        {/* Content skeleton */}
        <div className="space-y-3 mt-12">
          <div className="h-4 bg-white/10 rounded" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-4/6" />
        </div>
        
        {/* Cards skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

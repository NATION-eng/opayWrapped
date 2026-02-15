'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

interface ProgressIndicatorProps {
  sections: string[]
  className?: string
}

export default function ProgressIndicator({ 
  sections,
  className = '' 
}: ProgressIndicatorProps) {
  const scrollProgress = useScrollProgress()
  
  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Section dots */}
      <div className="flex justify-center gap-2 py-4 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        {sections.map((section, index) => {
          const sectionProgress = (scrollProgress / 100) * sections.length
          const isActive = sectionProgress >= index && sectionProgress < index + 1
          const isCompleted = sectionProgress > index + 1
          
          return (
            <button
              key={section}
              onClick={() => {
                const element = document.getElementById(section)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${isCompleted ? 'bg-emerald-500 w-3 h-3' : ''}
                ${isActive ? 'bg-emerald-400 w-4 h-4' : ''}
                ${!isActive && !isCompleted ? 'bg-white/30' : ''}
              `}
              aria-label={`Go to ${section} section`}
              aria-current={isActive ? 'step' : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

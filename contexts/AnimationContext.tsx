'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

interface AnimationContextType {
  shouldReduceMotion: boolean
}

const AnimationContext = createContext<AnimationContextType | null>(null)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  
  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)
    
    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return (
    <AnimationContext.Provider value={{ shouldReduceMotion }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}

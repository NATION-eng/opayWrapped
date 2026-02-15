import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const percentage = height > 0 ? (scrolled / height) * 100 : 0
      setProgress(Math.min(100, Math.max(0, percentage)))
    }
    
    // Update on mount
    updateProgress()
    
    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })
    
    // Update on resize (height might change)
    window.addEventListener('resize', updateProgress, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])
  
  return progress
}

import { useState, useEffect } from 'react'

export function useCountUp(
  end: number, 
  duration: number = 2000, 
  shouldStart: boolean = true
): number {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!shouldStart) return
    
    let startTime: number | null = null
    const startValue = 0
    let animationFrameId: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (end - startValue) * easeOut
      
      setCount(currentValue)
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    
    animationFrameId = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [end, duration, shouldStart])
  
  return count
}

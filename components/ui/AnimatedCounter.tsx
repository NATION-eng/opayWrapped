'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useCountUp } from '@/hooks/useCountUp'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  separator?: string
  className?: string
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className = ''
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '-100px 0px'
  })
  
  const count = useCountUp(end, duration, inView)
  
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    
    return parts.join('.')
  }
  
  return (
    <span 
      ref={ref} 
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

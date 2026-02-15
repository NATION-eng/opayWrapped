'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

interface CardProps {
  title: string
  value: ReactNode
  subtitle?: string
  icon?: ReactNode
  trend?: number
  onClick?: () => void
  className?: string
  variant?: 'default' | 'solid' | 'gradient' | 'glass'
}

export default function Card({ 
  title, 
  value, 
  subtitle, 
  icon,
  trend,
  onClick,
  className = '',
  variant = 'default'
}: CardProps) {
  const { shouldReduceMotion } = useAnimation()
  
  const variants = {
    default: 'bg-white/10 backdrop-blur-lg',
    solid: 'bg-emerald-800',
    gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10'
  }
  
  const CardWrapper = onClick ? motion.button : motion.div
  
  return (
    <CardWrapper
      whileHover={onClick && !shouldReduceMotion ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick && !shouldReduceMotion ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        ${variants[variant]} 
        rounded-2xl p-6 
        ${onClick ? 'cursor-pointer text-left w-full' : ''} 
        ${className}
        transition-shadow hover:shadow-xl
      `}
      aria-label={onClick ? `${title}: ${value}` : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/80">
          {title}
        </h3>
        {icon && (
          <div className="text-emerald-400 text-2xl" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>
      
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {value}
      </div>
      
      {subtitle && (
        <p className="text-white/60 text-sm">
          {subtitle}
        </p>
      )}
      
      {trend !== undefined && (
        <div 
          className={`mt-4 flex items-center text-sm font-medium ${
            trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-red-400' : 'text-white/60'
          }`}
          aria-label={`Trend: ${trend > 0 ? 'up' : trend < 0 ? 'down' : 'unchanged'} ${Math.abs(trend)} percent`}
        >
          <span aria-hidden="true">
            {trend > 0 && '↑'}
            {trend < 0 && '↓'}
            {trend === 0 && '→'}
          </span>
          <span className="ml-1">
            {Math.abs(trend)}% {trend !== 0 ? 'from last year' : 'unchanged'}
          </span>
        </div>
      )}
    </CardWrapper>
  )
}

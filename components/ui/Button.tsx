'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const { shouldReduceMotion } = useAnimation()
  
  const baseStyles = 'rounded-full font-semibold transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-400',
    secondary: 'bg-white hover:bg-gray-100 text-emerald-900 focus:ring-gray-400',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-400',
    ghost: 'text-white hover:bg-white/10 focus:ring-white/20'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const MotionButton = motion.button
  
  return (
    <MotionButton
      whileHover={disabled || loading || shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={disabled || loading || shouldReduceMotion ? {} : { scale: 0.95 }}
      disabled={disabled || loading}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin h-5 w-5" 
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </MotionButton>
  )
}

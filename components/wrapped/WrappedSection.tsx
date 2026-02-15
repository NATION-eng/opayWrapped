'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

interface WrappedSectionProps {
  id: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  background?: string
  delay?: number
}

export default function WrappedSection({ 
  id,
  title, 
  subtitle,
  children, 
  className = '',
  background = 'transparent',
  delay = 0 
}: WrappedSectionProps) {
  const { shouldReduceMotion } = useAnimation()
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '-100px 0px'
  })
  
  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
  
  return (
    <section 
      id={id}
      ref={ref}
      className={`min-h-screen flex items-center justify-center py-20 px-4 ${className}`}
      style={{ background }}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <motion.div 
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate={inView ? "visible" : "hidden"}
        variants={animationVariants}
        className="w-full max-w-6xl"
      >
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 
                id={`${id}-title`} 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  )
}

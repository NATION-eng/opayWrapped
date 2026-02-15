'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

interface CategoryChartProps {
  data: Record<string, number>
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const { shouldReduceMotion } = useAnimation()
  
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  const categories = Object.entries(data)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: (amount / total) * 100
    }))
    .sort((a, b) => b.amount - a.amount)
  
  const colors = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-orange-500'
  ]
  
  const getEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      'Food & Dining': '🍽️',
      'Transport': '🚗',
      'Bills & Utilities': '💡',
      'Shopping': '🛍️',
      'Entertainment': '🎬',
      'Other': '📦'
    }
    return emojiMap[category] || '📊'
  }
  
  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: shouldReduceMotion ? 0 : index * 0.1,
            duration: shouldReduceMotion ? 0 : 0.5
          }}
          onMouseEnter={() => setHoveredCategory(category.name)}
          onMouseLeave={() => setHoveredCategory(null)}
          onFocus={() => setHoveredCategory(category.name)}
          onBlur={() => setHoveredCategory(null)}
          className="relative group"
          tabIndex={0}
          role="listitem"
          aria-label={`${category.name}: ${category.amount.toLocaleString()} Naira, ${category.percentage.toFixed(1)} percent`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium flex items-center gap-2">
              <span aria-hidden="true">{getEmoji(category.name)}</span>
              {category.name}
            </span>
            <span className="text-white/70 font-mono">
              ₦{category.amount.toLocaleString()}
            </span>
          </div>
          
          <div className="h-12 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${category.percentage}%` }}
              transition={{ 
                delay: shouldReduceMotion ? 0 : index * 0.1 + 0.3, 
                duration: shouldReduceMotion ? 0 : 1, 
                ease: "easeOut" 
              }}
              className={`h-full ${colors[index % colors.length]} flex items-center justify-end pr-4 transition-all`}
            >
              {(hoveredCategory === category.name || category.percentage > 15) && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white font-bold text-sm"
                >
                  {category.percentage.toFixed(1)}%
                </motion.span>
              )}
            </motion.div>
            
            {/* Tooltip on hover */}
            {hoveredCategory === category.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-10"
              >
                {category.percentage.toFixed(1)}% of total spending
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useAnimation } from '@/contexts/AnimationContext'
import { useWrappedData } from '@/contexts/WrappedDataContext'

export default function Hero() {
  const { shouldReduceMotion } = useAnimation()
  const { data } = useWrappedData()
  
  const handleStart = () => {
    const nextSection = document.querySelector('#spending')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Logo or brand mark could go here */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl mb-4" role="img" aria-label="Celebration">
            🎉
          </div>
        </motion.div>

        <motion.h1 
          id="hero-title"
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          {data?.user.name ? (
            <>
              Welcome Back,<br />
              <span className="text-gradient">{data.user.name}</span>
            </>
          ) : (
            <>
              Your <span className="text-gradient">OPay Wrapped</span>
              <br />2024
            </>
          )}
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
        >
          Your personalized financial journey through 2024.
          <br />
          Let's explore your year together.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleStart}
            size="lg"
            variant="primary"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            }
          >
            Start Your Journey
          </Button>
          
          <Button
            onClick={() => {
              const shareSection = document.querySelector('#share')
              if (shareSection) {
                shareSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            size="lg"
            variant="outline"
          >
            Skip to Share
          </Button>
        </motion.div>

        {/* Quick stats preview */}
        {data && (
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {data.transactions.total}
              </div>
              <div className="text-sm text-white/70 mt-1">
                Transactions
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                ₦{(data.spending.total / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-white/70 mt-1">
                Total Spent
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                ₦{(data.savings.total / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-white/70 mt-1">
                Saved
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {data.rewards.tier}
              </div>
              <div className="text-sm text-white/70 mt-1">
                Tier
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-white/50"
          aria-hidden="true"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
        <span className="sr-only">Scroll down to continue</span>
      </motion.div>
    </section>
  )
}

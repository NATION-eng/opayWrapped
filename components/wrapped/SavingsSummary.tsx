'use client'

import { useWrappedData } from '@/contexts/WrappedDataContext'
import WrappedSection from './WrappedSection'
import Card from '@/components/ui/Card'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { motion } from 'framer-motion'

export default function SavingsSummary() {
  const { data, loading, error } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="savings" title="Calculating your progress...">
        <SkeletonLoader variant="card" count={3} />
      </WrappedSection>
    )
  }
  
  if (error || !data) return null
  
  const { savings } = data
  
  return (
    <WrappedSection 
      id="savings" 
      title="Your Savings Journey"
      subtitle="Building wealth, one naira at a time"
    >
      {/* Main savings stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card
          title="Total Saved"
          value={
            <AnimatedCounter 
              end={savings.total} 
              prefix="₦"
              separator=","
            />
          }
          subtitle="Your safety net"
          icon="💰"
          variant="gradient"
        />
        
        <Card
          title="Monthly Average"
          value={
            <AnimatedCounter 
              end={savings.monthlyAverage} 
              prefix="₦"
              separator=","
            />
          }
          subtitle="Consistent growth"
          icon="📊"
        />
        
        <Card
          title="Interest Earned"
          value={
            <AnimatedCounter 
              end={savings.interestEarned} 
              prefix="₦"
              separator=","
            />
          }
          subtitle="Passive income"
          icon="🌱"
        />
      </div>

      {/* Savings goal progress */}
      <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Goal Progress
            </h3>
            <p className="text-white/70">
              You're {savings.percentageOfGoal}% of the way there!
            </p>
          </div>
          <div className="text-5xl">
            {savings.percentageOfGoal >= 100 ? '🎯' : '🎪'}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-8 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(savings.percentageOfGoal, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 flex items-center justify-end pr-4"
            >
              {savings.percentageOfGoal >= 20 && (
                <span className="text-white font-bold text-sm">
                  {savings.percentageOfGoal}%
                </span>
              )}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-white/70">
          <span>₦{savings.total.toLocaleString()}</span>
          <span>Goal: ₦{savings.goal.toLocaleString()}</span>
        </div>

        {savings.percentageOfGoal >= 100 && (
          <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl">
            <p className="text-emerald-400 font-semibold text-center">
              🎉 Congratulations! You've reached your savings goal!
            </p>
          </div>
        )}

        {savings.percentageOfGoal < 100 && (
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-white/80 text-center">
              Just ₦{(savings.goal - savings.total).toLocaleString()} more to reach your goal!
            </p>
          </div>
        )}
      </div>

      {/* Savings streak */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">🔥</div>
          <h3 className="text-3xl font-bold text-white mb-2">
            <AnimatedCounter end={savings.longestStreak} /> Days
          </h3>
          <p className="text-white/70">
            Your longest savings streak
          </p>
          <p className="text-sm text-white/50 mt-4">
            Consistency is key to building wealth!
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-3xl font-bold text-white mb-2">
            Excellent
          </h3>
          <p className="text-white/70">
            Savings Health Score
          </p>
          <p className="text-sm text-white/50 mt-4">
            You're in the top 20% of savers!
          </p>
        </div>
      </div>

      {/* Motivational message */}
      <div className="mt-12 text-center">
        <p className="text-lg md:text-xl text-white/80 italic">
          "{savings.percentageOfGoal >= 80 
            ? "You're almost there! Keep up the amazing work!" 
            : "Every small step brings you closer to your dreams. Keep saving!"}"
        </p>
      </div>
    </WrappedSection>
  )
}

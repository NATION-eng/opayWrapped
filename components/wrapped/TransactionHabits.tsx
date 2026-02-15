'use client'

import { useWrappedData } from '@/contexts/WrappedDataContext'
import WrappedSection from './WrappedSection'
import Card from '@/components/ui/Card'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function TransactionHabits() {
  const { data, loading, error } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="habits" title="Analyzing your patterns...">
        <SkeletonLoader variant="card" count={4} />
      </WrappedSection>
    )
  }
  
  if (error || !data) return null
  
  const { transactions } = data
  
  const getDayEmoji = (day: string): string => {
    const emojiMap: Record<string, string> = {
      'Monday': '😴',
      'Tuesday': '💼',
      'Wednesday': '🐫',
      'Thursday': '🎯',
      'Friday': '🎉',
      'Saturday': '🛍️',
      'Sunday': '😌'
    }
    return emojiMap[day] || '📅'
  }
  
  return (
    <WrappedSection 
      id="habits" 
      title="Your Transaction Habits"
      subtitle="Patterns that define your financial rhythm"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card
          title="Total Transactions"
          value={
            <AnimatedCounter 
              end={transactions.total}
              separator=","
            />
          }
          subtitle="Throughout the year"
          icon="🔄"
          variant="glass"
        />
        
        <Card
          title="Most Active Day"
          value={transactions.mostActiveDay}
          subtitle="Your busiest day"
          icon={getDayEmoji(transactions.mostActiveDay)}
          variant="glass"
        />
        
        <Card
          title="Peak Time"
          value={transactions.mostActiveTime}
          subtitle="When you transact most"
          icon="⏰"
          variant="glass"
        />
        
        <Card
          title="Monthly Average"
          value={
            <AnimatedCounter 
              end={Math.round(transactions.total / 12)}
            />
          }
          subtitle="Transactions per month"
          icon="📈"
          variant="glass"
        />
      </div>

      {/* Transaction size insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
          <div className="text-4xl mb-4">🎊</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Biggest Transaction
          </h3>
          <div className="text-4xl font-bold text-emerald-400 mb-2">
            ₦{transactions.largestTransaction.toLocaleString()}
          </div>
          <p className="text-white/70">
            That was a memorable moment!
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8">
          <div className="text-4xl mb-4">🪙</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Smallest Transaction
          </h3>
          <div className="text-4xl font-bold text-blue-400 mb-2">
            ₦{transactions.smallestTransaction.toLocaleString()}
          </div>
          <p className="text-white/70">
            Every naira counts!
          </p>
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8">
        <p className="text-lg md:text-xl text-white">
          <span className="font-bold text-emerald-400">
            Did you know?
          </span>{' '}
          You made an average of{' '}
          <span className="font-bold">
            {Math.round(transactions.total / 365)}
          </span>{' '}
          transactions per day in 2024. That's one transaction every{' '}
          <span className="font-bold">
            {Math.round(24 / (transactions.total / 365))}
          </span>{' '}
          hours!
        </p>
      </div>
    </WrappedSection>
  )
}

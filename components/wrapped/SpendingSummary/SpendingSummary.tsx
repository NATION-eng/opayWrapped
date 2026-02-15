'use client'

import { useWrappedData } from '@/contexts/WrappedDataContext'
import WrappedSection from '../WrappedSection'
import Card from '@/components/ui/Card'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import CategoryChart from './CategoryChart'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function SpendingSummary() {
  const { data, loading, error } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="spending" title="Loading your spending story...">
        <SkeletonLoader variant="card" count={3} />
      </WrappedSection>
    )
  }
  
  if (error || !data) {
    return (
      <WrappedSection id="spending" title="Oops!">
        <div className="text-center">
          <p className="text-lg text-white/70 mb-6">
            We couldn't load your spending data. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition-colors"
          >
            Reload
          </button>
        </div>
      </WrappedSection>
    )
  }
  
  const { spending, transactions } = data
  
  return (
    <WrappedSection 
      id="spending" 
      title="Your Spending Story"
      subtitle={`In 2024, you made ${transactions.total} transactions`}
    >
      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card
          title="Total Spent"
          value={
            <AnimatedCounter 
              end={spending.total} 
              prefix="₦"
              separator=","
            />
          }
          trend={spending.yearOverYearChange}
          icon="💰"
          variant="gradient"
        />
        
        <Card
          title="Average Transaction"
          value={
            <AnimatedCounter 
              end={spending.averageTransaction} 
              prefix="₦"
              separator=","
            />
          }
          subtitle="Per transaction"
          icon="📊"
        />
        
        <Card
          title="Top Merchant"
          value={spending.topMerchant}
          subtitle={`₦${spending.topMerchantSpend.toLocaleString()} spent`}
          icon="🏪"
        />
      </div>
      
      {/* Category Breakdown */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
          Where Your Money Went
        </h3>
        <CategoryChart data={spending.byCategory} />
      </div>
      
      {/* Insights */}
      <div className="mt-12 text-center space-y-4">
        <p className="text-lg md:text-xl text-white/70">
          Your top category was{' '}
          <span className="text-emerald-400 font-bold">
            {Object.entries(spending.byCategory).sort((a, b) => b[1] - a[1])[0][0]}
          </span>
        </p>
        
        {spending.yearOverYearChange > 0 && (
          <p className="text-base text-white/60">
            You spent {spending.yearOverYearChange}% more than last year, but that's okay! 
            Growth means living life. 🌱
          </p>
        )}
        
        {spending.yearOverYearChange < 0 && (
          <p className="text-base text-white/60">
            Amazing! You spent {Math.abs(spending.yearOverYearChange)}% less than last year. 
            That's some serious financial discipline! 💪
          </p>
        )}
      </div>
    </WrappedSection>
  )
}

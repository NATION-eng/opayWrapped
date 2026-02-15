'use client'

import { useWrappedData } from '@/contexts/WrappedDataContext'
import WrappedSection from './WrappedSection'
import Card from '@/components/ui/Card'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export function Transport() {
  const { data, loading } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="transport" title="Mapping your journeys...">
        <SkeletonLoader variant="card" count={3} />
      </WrappedSection>
    )
  }
  
  if (!data) return null
  
  const { transport } = data
  
  return (
    <WrappedSection 
      id="transport" 
      title="Your Transport Journey"
      subtitle={`${transport.rides} rides across ${transport.distanceTraveled.toLocaleString()} km`}
    >
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card
          title="Total Spent"
          value={
            <AnimatedCounter 
              end={transport.total} 
              prefix="₦"
              separator=","
            />
          }
          icon="🚗"
          variant="gradient"
        />
        
        <Card
          title="Total Rides"
          value={<AnimatedCounter end={transport.rides} />}
          subtitle={`Avg: ₦${transport.averageRideCost.toLocaleString()}/ride`}
          icon="🎫"
        />
        
        <Card
          title="Distance Traveled"
          value={
            <>
              <AnimatedCounter end={transport.distanceTraveled} separator="," /> km
            </>
          }
          subtitle="Around the world!"
          icon="🌍"
        />
      </div>

      <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Most Popular Route</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {transport.topRoute}
            </div>
            <p className="text-white/70">
              Your go-to journey
            </p>
          </div>
          <div className="text-6xl">🗺️</div>
        </div>
      </div>

      <div className="mt-8 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6">
        <p className="text-lg text-white">
          <span className="text-emerald-400 font-bold">🌱 Eco Impact:</span>{' '}
          You helped save approximately {transport.co2Saved}kg of CO₂ by using OPay transport!
        </p>
      </div>
    </WrappedSection>
  )
}

export function Rewards() {
  const { data, loading } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="rewards" title="Tallying your rewards...">
        <SkeletonLoader variant="card" count={3} />
      </WrappedSection>
    )
  }
  
  if (!data) return null
  
  const { rewards } = data
  
  return (
    <WrappedSection 
      id="rewards" 
      title="Your Rewards & Achievements"
      subtitle="All the perks you've earned"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card
          title="Points Earned"
          value={
            <AnimatedCounter 
              end={rewards.pointsEarned}
              separator=","
            />
          }
          icon="⭐"
          variant="gradient"
        />
        
        <Card
          title="Cashback Earned"
          value={
            <AnimatedCounter 
              end={rewards.cashbackEarned}
              prefix="₦"
              separator=","
            />
          }
          icon="💸"
        />
        
        <Card
          title="Current Tier"
          value={rewards.tier}
          subtitle={`${rewards.rewardsRedeemed} rewards redeemed`}
          icon="👑"
        />
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Badges Unlocked</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rewards.badgesUnlocked.map((badge, index) => (
            <div 
              key={badge}
              className="bg-gradient-to-br from-emerald-600/30 to-emerald-800/30 border border-emerald-500/30 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-2">
                {index === 0 && '🌅'}
                {index === 1 && '💰'}
                {index === 2 && '🚗'}
                {index === 3 && '🎯'}
              </div>
              <div className="text-white font-semibold text-sm">
                {badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-white/80">
          You've unlocked <span className="text-emerald-400 font-bold">{rewards.badgesUnlocked.length}</span> badges 
          and saved <span className="text-emerald-400 font-bold">₦{rewards.cashbackEarned.toLocaleString()}</span> in cashback!
        </p>
      </div>
    </WrappedSection>
  )
}

export function FinancialPersonality() {
  const { data, loading } = useWrappedData()
  
  if (loading) {
    return (
      <WrappedSection id="personality" title="Analyzing your profile...">
        <SkeletonLoader />
      </WrappedSection>
    )
  }
  
  if (!data) return null
  
  const { personality } = data
  
  return (
    <WrappedSection 
      id="personality" 
      title="Your Financial Personality"
      subtitle="Who are you with money?"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12 text-center mb-12">
          <div className="text-6xl md:text-8xl mb-6">🧠</div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {personality.type}
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {personality.description}
          </p>
        </div>

        <h4 className="text-2xl font-bold text-white mb-6 text-center">Your Top Traits</h4>
        <div className="space-y-4 mb-12">
          {personality.traits.map((trait, index) => (
            <div key={trait.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-white">{trait.name}</span>
                <span className="text-emerald-400 font-bold">{trait.score}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                  style={{ width: `${trait.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
          <h4 className="text-2xl font-bold text-white mb-2">Financial Health</h4>
          <div className="text-5xl font-bold text-emerald-400 mb-2">
            {personality.financialHealth}
          </div>
          <p className="text-white/70">
            Keep up the great work! Your financial decisions reflect wisdom and planning.
          </p>
        </div>
      </div>
    </WrappedSection>
  )
}

export function SharePage() {
  const { data } = useWrappedData()
  
  const handleShare = async (platform: string) => {
    if (!data) return
    
    const shareText = `I spent ₦${data.spending.total.toLocaleString()} and saved ₦${data.savings.total.toLocaleString()} in 2024 with OPay! 🎉 Check out your #OPayWrapped`
    const shareUrl = 'https://wrapped.opay.com'
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: 'My OPay Wrapped 2024',
          text: shareText,
          url: shareUrl
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`,
        '_blank'
      )
    } else if (platform === 'whatsapp') {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        '_blank'
      )
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareText + ' ' + shareUrl)
      alert('Copied to clipboard!')
    }
  }
  
  return (
    <WrappedSection 
      id="share" 
      title="Share Your Story"
      subtitle="Let the world know about your financial journey"
    >
      {data && (
        <>
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-12 mb-12 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              My OPay Wrapped 2024
            </h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-white/80 mb-2">Total Spent</div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  ₦{(data.spending.total / 1000000).toFixed(1)}M
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/80 mb-2">Total Saved</div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  ₦{(data.savings.total / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
            <div className="text-center text-white/90">
              <div className="text-lg mb-2">Financial Personality</div>
              <div className="text-2xl font-bold">{data.personality.type}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => handleShare('twitter')}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
              Share on X
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Share on WhatsApp
            </button>

            <button
              onClick={() => handleShare('copy')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>

          <div className="text-center">
            <p className="text-white/70 mb-4">
              Want to see your own OPay Wrapped?
            </p>
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-colors">
              Create Your Wrapped
            </button>
          </div>
        </>
      )}
    </WrappedSection>
  )
}

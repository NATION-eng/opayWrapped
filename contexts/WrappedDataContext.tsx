'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface WrappedData {
  user: {
    name: string
    accountAge: number
  }
  spending: {
    total: number
    byCategory: Record<string, number>
    topMerchant: string
    topMerchantSpend: number
    averageTransaction: number
    yearOverYearChange: number
  }
  transactions: {
    total: number
    mostActiveDay: string
    mostActiveTime: string
    largestTransaction: number
    smallestTransaction: number
    averagePerMonth: number
  }
  savings: {
    total: number
    goal: number
    percentageOfGoal: number
    monthlyAverage: number
    longestStreak: number
    interestEarned: number
  }
  transport: {
    total: number
    rides: number
    averageRideCost: number
    topRoute: string
    distanceTraveled: number
    co2Saved: number
  }
  rewards: {
    pointsEarned: number
    cashbackEarned: number
    badgesUnlocked: string[]
    rewardsRedeemed: number
    tier: string
  }
  personality: {
    type: string
    description: string
    traits: Array<{ name: string; score: number }>
    financialHealth: string
  }
}

interface WrappedDataContextType {
  data: WrappedData | null
  loading: boolean
  error: string | null
  setData: (data: WrappedData) => void
}

const WrappedDataContext = createContext<WrappedDataContextType | null>(null)

export function WrappedDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WrappedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchWrappedData() {
      try {
        setLoading(true)
        
        // OPTION 1: Real API call (uncomment when ready)
        // const response = await fetch('/api/wrapped-data', {
        //   headers: {
        //     'Authorization': `Bearer ${userToken}`
        //   }
        // })
        // if (!response.ok) throw new Error('Failed to fetch data')
        // const wrappedData = await response.json()
        
        // OPTION 2: Mock data for development
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
        const wrappedData = getMockWrappedData()
        
        setData(wrappedData)
      } catch (err) {
        console.error('Error fetching wrapped data:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchWrappedData()
  }, [])
  
  return (
    <WrappedDataContext.Provider value={{ data, loading, error, setData }}>
      {children}
    </WrappedDataContext.Provider>
  )
}

export function useWrappedData() {
  const context = useContext(WrappedDataContext)
  if (!context) {
    throw new Error('useWrappedData must be used within WrappedDataProvider')
  }
  return context
}

// Mock data generator
function getMockWrappedData(): WrappedData {
  return {
    user: {
      name: 'Adebayo',
      accountAge: 365, // days
    },
    spending: {
      total: 2450000, // NGN
      byCategory: {
        'Food & Dining': 680000,
        'Transport': 420000,
        'Bills & Utilities': 350000,
        'Shopping': 520000,
        'Entertainment': 280000,
        'Other': 200000
      },
      topMerchant: 'Shoprite',
      topMerchantSpend: 145000,
      averageTransaction: 8500,
      yearOverYearChange: 15 // percentage
    },
    transactions: {
      total: 289,
      mostActiveDay: 'Friday',
      mostActiveTime: '6:00 PM',
      largestTransaction: 75000,
      smallestTransaction: 50,
      averagePerMonth: 204166
    },
    savings: {
      total: 850000,
      goal: 1000000,
      percentageOfGoal: 85,
      monthlyAverage: 70833,
      longestStreak: 45, // days
      interestEarned: 12500
    },
    transport: {
      total: 420000,
      rides: 156,
      averageRideCost: 2692,
      topRoute: 'Lekki - VI',
      distanceTraveled: 2340, // km
      co2Saved: 125 // kg (if using public transport)
    },
    rewards: {
      pointsEarned: 12450,
      cashbackEarned: 18500,
      badgesUnlocked: ['Early Bird', 'Saver', 'Frequent Rider', 'Goal Crusher'],
      rewardsRedeemed: 8,
      tier: 'Gold'
    },
    personality: {
      type: 'Strategic Saver',
      description: 'You balance smart spending with consistent saving habits. Your disciplined approach to finances shows you understand the value of both enjoying today and planning for tomorrow.',
      traits: [
        { name: 'Disciplined', score: 85 },
        { name: 'Strategic', score: 78 },
        { name: 'Rewarding', score: 72 }
      ],
      financialHealth: 'Excellent'
    }
  }
}

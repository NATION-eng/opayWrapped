'use client'

import Hero from '@/components/wrapped/Hero'
import SpendingSummary from '@/components/wrapped/SpendingSummary/SpendingSummary'
import TransactionHabits from '@/components/wrapped/TransactionHabits'
import SavingsSummary from '@/components/wrapped/SavingsSummary'
import { Transport, Rewards, FinancialPersonality, SharePage } from '@/components/wrapped/AllSections'
import ProgressIndicator from '@/components/ui/ProgressIndicator'

const sections = [
  'hero',
  'spending',
  'habits',
  'savings',
  'transport',
  'rewards',
  'personality',
  'share'
]

export default function Home() {
  return (
    <>
      <ProgressIndicator sections={sections} />
      
      <div className="relative">
        <Hero />
        <SpendingSummary />
        <TransactionHabits />
        <SavingsSummary />
        <Transport />
        <Rewards />
        <FinancialPersonality />
        <SharePage />
      </div>
    </>
  )
}

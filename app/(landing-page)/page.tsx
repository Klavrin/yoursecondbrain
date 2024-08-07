'use client'

import LandingPageHeader from './header'
import HeroSection from '@/components/sections/hero-section'

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <LandingPageHeader />
      <HeroSection />
    </div>
  )
}

export default LandingPage

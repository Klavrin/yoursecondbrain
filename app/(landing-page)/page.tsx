'use client'

import HeroSection from '@/components/sections/hero-section'
import LandingPageHeader from './header'

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      <LandingPageHeader />
      <HeroSection />
    </div>
  )
}

export default LandingPage

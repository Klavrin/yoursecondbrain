'use client'

import LandingPageHeader from '@/app/landing/header'
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

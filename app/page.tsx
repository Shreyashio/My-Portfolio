'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TopicsSection from '@/components/TopicsSection'
import TechStack from '@/components/TechStack'
import GitHubStats from '@/components/GitHubStats'
import ContactSection from '@/components/ContactSection'
import QuoteWall from '@/components/QuoteWall'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      {/* Noise overlay — subtle grain texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <TopicsSection />
        <TechStack />
        <GitHubStats />
        <ContactSection />
        <QuoteWall />
      </main>
    </>
  )
}

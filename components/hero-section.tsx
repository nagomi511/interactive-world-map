'use client'

import Image from 'next/image'

export function HeroSection() {
  return (
    <div className="relative w-full mx-0" style={{ marginTop: '48px', paddingBottom: '48px' }}>
      <div className="relative w-full" style={{ height: '400px' }}>
        <Image
          src="/about-us-hero.svg"
          alt="Indigenous peoples cultural imagery"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

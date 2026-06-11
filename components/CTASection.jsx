'use client'

import { useEffect, useRef } from 'react'

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120)
          })
        }
      }),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="Travel adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/80 to-onyx/90" />
      </div>

      {/* Gold radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gold/8 blur-[100px]" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-gold/20" />
      <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-gold/20" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-gold/20" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-gold/20" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8 reveal">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center animate-float">
            <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>
            </svg>
          </div>
        </div>

        {/* Pre-heading */}
        <div className="flex items-center justify-center gap-4 mb-5 reveal">
          <div className="h-px w-12 bg-gold/50" />
          <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">Join Our Community</span>
          <div className="h-px w-12 bg-gold/50" />
        </div>

        {/* Heading */}
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-cream mb-6 leading-tight reveal">
          Join Our Family<br />
          <span className="italic gold-shimmer">Travel Journey</span>
        </h2>

        {/* Body */}
        <p className="font-body font-light text-base sm:text-lg text-cream/60 max-w-2xl mx-auto leading-relaxed mb-4 reveal">
          Follow along as the Okuns family explore Ireland's castles, coastlines, and hidden gems —
          and venture further afield on world adventures.
        </p>
        <p className="font-body text-sm text-cream/45 max-w-xl mx-auto leading-relaxed mb-10 reveal">
          Subscribe to our YouTube channel for weekly travel videos, vlogs, hotel tours, and family day-out guides.
          New adventures every week.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-12 reveal">
          {[
            { value: '100+', label: 'Destinations' },
            { value: '50+', label: 'Blog Posts' },
            { value: 'Weekly', label: 'New Videos' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl text-gold">{s.value}</div>
              <div className="font-body text-xs tracking-widest uppercase text-cream/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <a
            href="https://www.youtube.com/@OkunsFamily"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gold hover:bg-gold-light text-onyx font-body text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 hover:shadow-gold-lg"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
          <a
            href="#blog"
            className="flex items-center gap-3 border border-gold/40 hover:border-gold text-cream/70 hover:text-gold font-body text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 backdrop-blur-sm"
          >
            Read the Blog
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const FALLBACK_SLIDES = [
  { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', location: 'Wild Atlantic Way, Ireland', heading: 'Explore Ireland', italic: '& The World', sub: 'With Us', tag: 'Ireland Travel' },
  { id: 2, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85', location: 'African Safari', heading: 'World Adventures', italic: 'Beyond the Horizon', sub: 'With the Family', tag: 'World Travel' },
]

const AUTOPLAY_INTERVAL = 6000

export default function Hero() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES)
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const timerRef = useRef(null)

  useEffect(() => {
    fetch('/api/slides')
      .then(r => r.json())
      .then(data => { if (data?.length) setSlides(data) })
      .catch(() => {})
  }, [])

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return
    setDirection(dir)
    setPrev(current)
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 900)
  }, [animating, current])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next')
  }, [current, goTo])

  const prev_ = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev')
  }, [current, goTo])

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL)
  }

  const handlePrev = () => { prev_(); resetTimer() }
  const handleNext = () => { next(); resetTimer() }
  const handleDot = (i) => { goTo(i, i > current ? 'next' : 'prev'); resetTimer() }

  const slide = slides[current]
  const prevSlide = prev !== null ? slides[prev] : null

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 scale-110 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 2 : (i === prev ? 1 : 0),
            transition: 'opacity 900ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <img
            src={s.image}
            alt={s.location}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-onyx/70 via-onyx/40 to-onyx/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-onyx/60 via-transparent to-onyx/40" />

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-20 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px z-20 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">

        {/* Location badge */}
        <div
          key={`loc-${current}`}
          className="flex items-center justify-center gap-3 mb-6"
          style={{ animation: 'fadeUp 0.6s ease forwards', opacity: 0 }}
        >
          <div className="h-px w-10 bg-gold/50" />
          <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">
            {slide.tag}
          </span>
          <div className="h-px w-10 bg-gold/50" />
        </div>

        {/* Main heading — re-animates on slide change */}
        <h1
          key={`h-${current}`}
          className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6"
          style={{ animation: 'fadeUp 0.7s 0.1s ease forwards', opacity: 0 }}
        >
          <span className="block text-cream">{slide.heading}</span>
          <span className="block italic gold-shimmer">{slide.italic}</span>
          <span className="block text-cream/90 text-4xl sm:text-5xl md:text-6xl">{slide.sub}</span>
        </h1>

        {/* Divider */}
        <div
          key={`div-${current}`}
          className="flex items-center justify-center gap-3 my-6"
          style={{ animation: 'fadeUp 0.7s 0.2s ease forwards', opacity: 0 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
          <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L21 9L16 13.74L17.18 21L12 17.77L6.82 21L8 13.74L3 9L9.91 8.26L12 2Z"/>
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Subheading */}
        <p
          key={`sub-${current}`}
          className="font-body font-light text-base sm:text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed tracking-wide mb-10"
          style={{ animation: 'fadeUp 0.7s 0.25s ease forwards', opacity: 0 }}
        >
          Family travel guides, hotel stays, food adventures,<br className="hidden sm:block" />
          road trips, and unforgettable memories.
        </p>

        {/* CTA Buttons */}
        <div
          key={`cta-${current}`}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.7s 0.35s ease forwards', opacity: 0 }}
        >
          <a
            href="https://www.youtube.com/@OkunsFamily"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gold hover:bg-gold-light text-onyx font-body text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:shadow-gold"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Our Videos
          </a>
          <a
            href="#destinations"
            className="flex items-center gap-3 border border-gold/50 hover:border-gold text-cream hover:text-gold font-body text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 backdrop-blur-sm"
          >
            Explore Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

        {/* Tagline */}
        <p className="mt-10 font-accent text-xs tracking-[0.35em] text-gold/50 uppercase opacity-0 animate-fade-up stagger-6" style={{ animationFillMode: 'forwards' }}>
          Exploring Ireland &amp; The World, One Family Adventure at a Time
        </p>
      </div>

      {/* ── Carousel controls ── */}

      {/* Prev arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 group w-12 h-12 rounded-full border border-gold/30 hover:border-gold bg-onyx/40 hover:bg-onyx/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
      >
        <svg className="w-5 h-5 text-cream/60 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 group w-12 h-12 rounded-full border border-gold/30 hover:border-gold bg-onyx/40 hover:bg-onyx/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
      >
        <svg className="w-5 h-5 text-cream/60 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dot indicators + location label */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        {/* Location label */}
        <span
          key={`lbl-${current}`}
          className="font-body text-xs text-cream/40 tracking-widest uppercase"
          style={{ animation: 'fadeUp 0.5s ease forwards', opacity: 0 }}
        >
          {slide.location}
        </span>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group flex items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-8 h-1.5 bg-gold'
                    : 'w-1.5 h-1.5 bg-cream/25 hover:bg-gold/50'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-32 h-px bg-gold/15 overflow-hidden">
          <div
            key={`prog-${current}`}
            className="h-full bg-gold origin-left"
            style={{ animation: `progressBar ${AUTOPLAY_INTERVAL}ms linear forwards` }}
          />
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-20 right-8 z-30 hidden sm:flex items-center gap-2">
        <span className="font-accent text-gold text-lg">{String(current + 1).padStart(2, '0')}</span>
        <div className="h-px w-6 bg-gold/30" />
        <span className="font-accent text-cream/30 text-sm">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l border-t border-gold/20 z-20" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r border-t border-gold/20 z-20" />

      {/* Progress bar keyframe injected via style tag */}
      <style>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}

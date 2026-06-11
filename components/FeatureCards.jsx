'use client'

import { useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    ),
    title: 'Ireland Road Trips',
    description: 'Discover the Wild Atlantic Way, the Ring of Kerry, and every scenic route in between with our family road trip guides.',
    count: '24 Guides',
    href: '#',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    ),
    title: 'Castle Stays',
    description: 'We\'ve slept in some of Ireland\'s most stunning castle hotels. Read our honest family reviews and find your dream stay.',
    count: '18 Reviews',
    href: '#',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    ),
    title: 'Family Hotels',
    description: 'From luxury resorts to cosy B&Bs — our curated hotel guides cover the best family-friendly stays across Ireland and beyond.',
    count: '32 Hotels',
    href: '#',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    ),
    title: 'Food & Restaurants',
    description: 'Ireland\'s food scene is incredible. Follow our family\'s culinary adventures from seafood shacks to castle dining rooms.',
    count: '40+ Reviews',
    href: '#',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    ),
    title: 'Beaches & Nature',
    description: 'Ireland\'s coastline is extraordinary. Discover our favourite family beaches, cliff walks, and wild nature spots.',
    count: '16 Guides',
    href: '#',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    ),
    title: 'Travel Tips',
    description: 'Real, practical travel advice from a real family. Packing lists, budgeting tricks, and everything in between.',
    count: '28 Articles',
    href: '#',
  },
]

export default function FeatureCards() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative py-24 bg-charcoal overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">What We Cover</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-cream mt-3 mb-4">
            Every Kind of <span className="italic text-gold">Adventure</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-5 font-body text-cream/50 max-w-xl mx-auto leading-relaxed">
            Whether you're planning an Irish road trip or a global family adventure, we have guides, reviews, and stories for every type of traveller.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <a
              key={f.title}
              href={f.href}
              className="reveal card-lift gold-border-hover group relative bg-onyx p-7 cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/70 transition-all duration-500" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  {f.icon}
                </svg>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl text-cream group-hover:text-gold transition-colors duration-300 mb-2">
                {f.title}
              </h3>
              <p className="font-body text-sm text-cream/50 leading-relaxed mb-5">
                {f.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="font-accent text-xs text-gold/60 tracking-wider">{f.count}</span>
                <div className="flex items-center gap-1 text-gold/0 group-hover:text-gold/70 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <span className="font-body text-xs">Explore</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

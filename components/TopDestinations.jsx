'use client'

import { useEffect, useRef, useState } from 'react'

export default function TopDestinations() {
  const sectionRef = useRef(null)
  const [destinations, setDestinations] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Ireland', 'World']

  useEffect(() => {
    fetch('/api/destinations')
      .then((r) => r.json())
      .then((data) => setDestinations(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      }),
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [destinations])

  const filtered = activeFilter === 'All' ? destinations : destinations.filter((d) => d.tag === activeFilter)

  return (
    <section id="destinations" ref={sectionRef} className="relative py-24 bg-onyx overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
          <div>
            <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">Where We've Been</span>
            <h2 className="font-display font-light text-4xl sm:text-5xl text-cream mt-3">
              Top <span className="italic text-gold">Destinations</span>
            </h2>
            <div className="gold-divider mt-4" style={{ margin: '1rem 0 0' }} />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${activeFilter === f ? 'bg-gold text-onyx border-gold' : 'border-gold/20 text-cream/50 hover:border-gold/50 hover:text-gold'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && destinations.length === 0 && (
          <p className="text-center text-cream/40 font-body py-16">No destinations yet. Add some in the admin panel.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, i) => (
            <div key={dest.id} className="reveal card-lift group relative overflow-hidden cursor-pointer" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative h-72 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 img-overlay" />
                <div className="absolute top-4 right-4 bg-onyx/80 border border-gold/30 backdrop-blur-sm px-3 py-1">
                  <span className="font-accent text-gold text-xs tracking-wider">{dest.tag}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="font-body text-xs text-cream/60">{dest.posts} articles</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-accent text-gold/70 text-xs tracking-widest mb-1">{dest.tagline}</p>
                <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors duration-300">{dest.name}</h3>
                <p className="font-body text-xs text-cream/50 mt-1 leading-relaxed line-clamp-2">{dest.description}</p>
                <div className="mt-3 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-body text-xs tracking-widest uppercase">Explore</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a href="#" className="inline-flex items-center gap-3 border border-gold/30 hover:border-gold text-cream/70 hover:text-gold font-body text-xs tracking-widest uppercase px-10 py-4 transition-all duration-300">
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

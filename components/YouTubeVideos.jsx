'use client'

import { useEffect, useRef, useState } from 'react'

function PlayIcon({ size = 'lg' }) {
  const s = size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
  const i = size === 'lg' ? 'w-5 h-5 ml-1' : 'w-3.5 h-3.5 ml-0.5'
  return (
    <div className={`${s} rounded-full bg-gold/90 flex items-center justify-center shadow-gold group-hover:bg-gold group-hover:scale-110 transition-all duration-300`}>
      <svg className={`${i} text-onyx`} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </div>
  )
}

export default function YouTubeVideos() {
  const sectionRef = useRef(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch('/api/videos')
      .then((r) => r.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      }),
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [videos])

  const [featured, ...rest] = videos

  return (
    <section id="videos" ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #111111 0%, #0D0D0D 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 blur-[100px]" style={{ background: 'radial-gradient(circle, #FF0000, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">Our Channel</span>
            </div>
            <h2 className="font-display font-light text-4xl sm:text-5xl text-cream">
              Latest Okuns Family <span className="italic text-gold">Videos</span>
            </h2>
            <div className="gold-divider mt-4" style={{ margin: '1rem 0 0' }} />
          </div>
          <div className="reveal">
            <a href="https://www.youtube.com/@OkunsFamily" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-body text-sm tracking-widest uppercase px-7 py-3.5 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>

        {videos.length === 0 && (
          <p className="text-center text-cream/40 font-body py-16">No videos yet. Add some in the admin panel.</p>
        )}

        {featured && (
          <div className="mb-6 reveal">
            <a href={featured.youtubeUrl} target="_blank" rel="noopener noreferrer"
              className="group relative block overflow-hidden bg-charcoal gold-border-hover">
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-3/5 h-64 lg:h-80 overflow-hidden">
                  <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-onyx/40 group-hover:bg-onyx/20 transition-all duration-300" />
                  <div className="play-overlay"><PlayIcon /></div>
                  <div className="absolute bottom-3 right-3 bg-onyx/90 px-2 py-1">
                    <span className="font-body text-xs text-cream/80">{featured.duration}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5">
                    <span className="font-body text-xs text-white uppercase tracking-wider">Latest</span>
                  </div>
                </div>
                <div className="lg:w-2/5 p-7 lg:p-10 flex flex-col justify-center">
                  <span className="font-accent text-gold/70 text-xs tracking-wider uppercase mb-3">{featured.category}</span>
                  <h3 className="font-display text-2xl lg:text-3xl text-cream group-hover:text-gold transition-colors duration-300 leading-snug mb-4">{featured.title}</h3>
                  <div className="flex items-center gap-4 text-cream/40 font-body text-xs">
                    <span>{featured.views} views</span><span>·</span><span>{featured.date}</span>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-gold font-body text-xs tracking-widest uppercase">
                    <span>Watch Now</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {rest.map((v, i) => (
              <a key={v.id} href={v.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="reveal card-lift gold-border-hover group relative bg-charcoal overflow-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-onyx/40 group-hover:bg-onyx/20 transition-all duration-300" />
                  <div className="play-overlay"><PlayIcon size="sm" /></div>
                  <div className="absolute bottom-2 right-2 bg-onyx/90 px-1.5 py-0.5">
                    <span className="font-body text-xs text-cream/70">{v.duration}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="font-accent text-gold/60 text-xs tracking-wider">{v.category}</span>
                  <h4 className="font-display text-sm text-cream group-hover:text-gold transition-colors duration-300 mt-1 line-clamp-2 leading-snug">{v.title}</h4>
                  <div className="mt-2 flex items-center gap-2 text-cream/35 font-body text-xs">
                    <span>{v.views}</span><span>·</span><span>{v.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-12 reveal">
          <p className="font-body text-cream/40 text-sm mb-5">Join thousands of families following our adventures</p>
          <a href="https://www.youtube.com/@OkunsFamily" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-red-600/50 hover:bg-red-600 text-red-400 hover:text-white font-body text-xs tracking-widest uppercase px-10 py-4 transition-all duration-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            View All Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}

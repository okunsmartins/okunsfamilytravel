'use client'

import { useEffect, useRef, useState } from 'react'

export default function TravelBlog() {
  const sectionRef = useRef(null)
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { setBlogPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
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
  }, [blogPosts])

  const [featured, ...rest] = blogPosts

  return (
    <section id="blog" ref={sectionRef} className="relative py-24 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-3"
        style={{ backgroundImage: 'linear-gradient(45deg, rgba(201,168,76,0.03) 25%, transparent 25%, transparent 75%, rgba(201,168,76,0.03) 75%), linear-gradient(45deg, rgba(201,168,76,0.03) 25%, transparent 25%, transparent 75%, rgba(201,168,76,0.03) 75%)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 40px 40px' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="font-accent text-gold text-xs tracking-[0.4em] uppercase">Our Journal</span>
          <h2 className="font-display font-light text-4xl sm:text-5xl text-cream mt-3 mb-4">
            Travel Stories <span className="italic text-gold">&amp; Guides</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-5 font-body text-cream/50 max-w-xl mx-auto leading-relaxed">
            Honest, practical, and heartfelt stories from our family adventures across Ireland and beyond.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        )}

        {!loading && blogPosts.length === 0 && (
          <p className="text-center text-cream/40 font-body py-16">No blog posts yet. Add some in the admin panel.</p>
        )}

        {!loading && featured && (
          <div className="mb-8 reveal">
            <div className="group relative overflow-hidden bg-onyx gold-border-hover card-lift cursor-pointer">
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: '300px' }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-onyx/40 hidden lg:block" />
                  <div className="absolute top-4 left-4 bg-gold text-onyx font-accent text-xs tracking-wider uppercase px-3 py-1">Featured</div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-accent text-gold text-xs tracking-widest uppercase">{featured.category}</span>
                    <span className="text-cream/20">·</span>
                    <span className="font-body text-xs text-cream/40">{featured.readTime}</span>
                  </div>
                  <h3 className="font-display text-3xl lg:text-4xl text-cream group-hover:text-gold transition-colors duration-300 leading-tight mb-4">{featured.title}</h3>
                  <p className="font-body text-sm text-cream/55 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-body text-xs text-cream/60">{featured.author}</p>
                        <p className="font-body text-xs text-cream/35">{featured.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gold font-body text-xs tracking-widest uppercase">
                      <span>Read More</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {rest.map((post, i) => (
              <div key={post.id} className="reveal card-lift gold-border-hover group bg-onyx overflow-hidden cursor-pointer" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 img-overlay" />
                  <div className="absolute top-3 left-3 bg-onyx/80 border border-gold/20 backdrop-blur-sm px-2.5 py-1">
                    <span className="font-accent text-gold text-xs tracking-wider">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-lg text-cream group-hover:text-gold transition-colors duration-300 leading-snug mb-2">{post.title}</h4>
                  <p className="font-body text-xs text-cream/45 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-cream/30 font-body text-xs">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 reveal">
          <a href="#" className="inline-flex items-center gap-3 border border-gold/30 hover:border-gold text-cream/70 hover:text-gold font-body text-xs tracking-widest uppercase px-10 py-4 transition-all duration-300">
            View All Blog Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Ireland Travel', href: '#destinations' },
  { label: 'World Travel', href: '#destinations' },
  { label: 'Hotels', href: '#features' },
  { label: 'Food', href: '#features' },
  { label: 'Family Adventures', href: '#features' },
  { label: 'Blog', href: '#blog' },
  { label: 'YouTube', href: 'https://www.youtube.com/@OkunsFamily', external: true },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'nav-blur bg-onyx/90 border-b border-gold/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex flex-col leading-none group">
            <span className="font-accent text-gold text-xl tracking-widest uppercase">Okuns</span>
            <span className="font-display text-cream/90 text-sm tracking-[0.3em] uppercase">Family Travel</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-cream/60 hover:text-gold transition-colors duration-300 px-3 py-2 link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.youtube.com/@OkunsFamily"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-onyx border border-gold/40 hover:border-gold font-body text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-cream/80 hover:text-gold transition-colors p-2"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden nav-blur bg-onyx/98 border-t border-gold/10 transition-all duration-500 overflow-hidden ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm tracking-widest uppercase text-cream/60 hover:text-gold py-3 border-b border-gold/5 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@OkunsFamily"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-center bg-gold text-onyx font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors duration-300"
          >
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </nav>
  )
}

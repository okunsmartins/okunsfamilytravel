const footerLinks = {
  'Explore': [
    { label: 'Ireland Travel', href: '#destinations' },
    { label: 'World Travel', href: '#destinations' },
    { label: 'Castle Stays', href: '#features' },
    { label: 'Family Hotels', href: '#features' },
    { label: 'Road Trips', href: '#features' },
  ],
  'Discover': [
    { label: 'Food & Restaurants', href: '#features' },
    { label: 'Beaches & Nature', href: '#features' },
    { label: 'Travel Tips', href: '#features' },
    { label: 'Family Adventures', href: '#features' },
    { label: 'Blog', href: '#blog' },
  ],
  'Connect': [
    { label: 'YouTube Channel', href: 'https://www.youtube.com/@OkunsFamily', external: true },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'Contact Us', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-onyx border-t border-gold/10 overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.15) 1px, transparent 0)', backgroundSize: '60px 60px' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="font-accent text-gold text-2xl tracking-widest uppercase block">Okuns</span>
              <span className="font-display text-cream/70 text-base tracking-[0.3em] uppercase block">Family Travel</span>
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-gold/60 to-transparent mb-5" />
            <p className="font-body text-sm text-cream/45 leading-relaxed max-w-xs">
              A family travel blog documenting adventures across Ireland and the world. Honest reviews, practical guides, and unforgettable memories.
            </p>
            <p className="font-body text-sm text-cream/45 leading-relaxed max-w-xs mt-3 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              "Exploring Ireland &amp; The World, One Family Adventure at a Time"
            </p>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@OkunsFamily"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal border border-gold/15 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal border border-gold/15 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group" aria-label="Instagram">
                <svg className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal border border-gold/15 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group" aria-label="Facebook">
                <svg className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-9 h-9 rounded-full bg-charcoal border border-gold/15 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center transition-all duration-300 group" aria-label="TikTok">
                <svg className="w-4 h-4 text-cream/50 group-hover:text-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-accent text-gold text-xs tracking-[0.35em] uppercase mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="font-body text-sm text-cream/45 hover:text-gold transition-colors duration-200 link-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/25 tracking-wide">
            © {new Date().getFullYear()} Okuns Family Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-gold/20" />
            <span className="font-accent text-gold/30 text-xs tracking-wider">Okuns Family Travel</span>
            <div className="h-px w-6 bg-gold/20" />
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="font-body text-xs text-cream/25 hover:text-gold/60 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-cream/25 hover:text-gold/60 transition-colors duration-200">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

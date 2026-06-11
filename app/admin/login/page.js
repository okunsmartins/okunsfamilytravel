'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email, password, redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center">
            <span className="font-accent text-gold text-3xl tracking-widest uppercase">Okuns</span>
            <span className="font-display text-cream/60 text-sm tracking-[0.4em] uppercase">Family Travel</span>
          </div>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
          <p className="mt-4 font-body text-xs text-cream/40 tracking-widest uppercase">Admin Panel</p>
        </div>

        {/* Form card */}
        <div className="bg-charcoal border border-gold/15 p-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <h2 className="font-display text-2xl text-cream mb-6">Sign In</h2>

          {error && (
            <div className="mb-5 bg-red-900/30 border border-red-500/30 text-red-400 font-body text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-xs text-cream/50 tracking-widest uppercase mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-onyx border border-gold/15 focus:border-gold/50 text-cream font-body text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-cream/20"
                placeholder="admin@okunsfamilytravel.com"
              />
            </div>
            <div>
              <label className="block font-body text-xs text-cream/50 tracking-widest uppercase mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-onyx border border-gold/15 focus:border-gold/50 text-cream font-body text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-cream/20"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-onyx font-body text-sm tracking-widest uppercase py-3.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-body text-xs text-cream/25">
          <a href="/" className="hover:text-gold/60 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  )
}

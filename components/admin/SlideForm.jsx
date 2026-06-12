'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SlideForm({ slide }) {
  const router = useRouter()
  const [form, setForm] = useState({
    heading: slide?.heading || '',
    italic: slide?.italic || '',
    sub: slide?.sub || '',
    tag: slide?.tag || '',
    location: slide?.location || '',
    image: slide?.image || '',
    order: slide?.order ?? 0,
    active: slide?.active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = slide ? `/api/slides/${slide.id}` : '/api/slides'
      const method = slide ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: parseInt(form.order) }),
      })
      if (!res.ok) throw new Error('Failed to save')
      router.push('/admin/slides')
      router.refresh()
    } catch {
      setError('Failed to save slide. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full bg-onyx border border-gold/20 text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="bg-red-900/30 border border-red-500/30 text-red-300 px-4 py-3 font-body text-sm">{error}</div>}

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Heading (large white text)</label>
        <input value={form.heading} onChange={e => set('heading', e.target.value)} required className={inputClass} placeholder="e.g. Explore Ireland" />
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Italic Line (gold text)</label>
        <input value={form.italic} onChange={e => set('italic', e.target.value)} required className={inputClass} placeholder="e.g. & The World" />
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Sub Line</label>
        <input value={form.sub} onChange={e => set('sub', e.target.value)} required className={inputClass} placeholder="e.g. With Us" />
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Tag (badge label)</label>
        <input value={form.tag} onChange={e => set('tag', e.target.value)} required className={inputClass} placeholder="e.g. Ireland Travel" />
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Location (bottom label)</label>
        <input value={form.location} onChange={e => set('location', e.target.value)} required className={inputClass} placeholder="e.g. Wild Atlantic Way, Ireland" />
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Image URL</label>
        <input value={form.image} onChange={e => set('image', e.target.value)} required className={inputClass} placeholder="https://images.unsplash.com/..." />
        {form.image && (
          <img src={form.image} alt="preview" className="mt-2 w-full h-40 object-cover opacity-70" onError={e => e.target.style.display='none'} />
        )}
      </div>

      <div>
        <label className="block font-body text-xs text-gold/70 tracking-widest uppercase mb-2">Order (display position)</label>
        <input type="number" value={form.order} onChange={e => set('order', e.target.value)} className={inputClass} min="0" />
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="active" checked={form.active} onChange={e => set('active', e.target.checked)} className="accent-gold w-4 h-4" />
        <label htmlFor="active" className="font-body text-sm text-cream/70">Active (visible on website)</label>
      </div>

      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={saving}
          className="bg-gold text-onyx font-body text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold/80 transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : slide ? 'Update Slide' : 'Create Slide'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="border border-gold/30 text-cream/60 font-body text-xs tracking-widest uppercase px-8 py-3 hover:border-gold/60 hover:text-cream transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

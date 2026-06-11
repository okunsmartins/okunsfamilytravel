'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = ['Ireland Travel', 'Castle Stays', 'Family Days Out', 'Road Trips', 'Hotels', 'Food & Restaurants', 'Beaches & Nature', 'World Travel']

export default function VideoForm({ video }) {
  const router = useRouter()
  const isEdit = !!video

  const [form, setForm] = useState({
    title: video?.title || '',
    thumbnail: video?.thumbnail || '',
    duration: video?.duration || '',
    views: video?.views || '0',
    date: video?.date || '',
    category: video?.category || categories[0],
    youtubeUrl: video?.youtubeUrl || 'https://www.youtube.com/@OkunsFamily',
    active: video?.active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isEdit ? `/api/videos/${video.id}` : '/api/videos'
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) { setError('Failed to save.'); return }
    router.push('/admin/videos')
    router.refresh()
  }

  const inputCls = "w-full bg-onyx border border-gold/15 focus:border-gold/50 text-cream font-body text-sm px-4 py-3 outline-none transition-colors placeholder:text-cream/20"
  const labelCls = "block font-body text-xs text-cream/50 tracking-widest uppercase mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="bg-red-900/30 border border-red-500/30 text-red-400 font-body text-sm px-4 py-3">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Video Title *</label>
          <input className={inputCls} value={form.title} onChange={(e) => update('title', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <select className={inputCls} value={form.category} onChange={(e) => update('category', e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Duration (e.g. 18:42)</label>
          <input className={inputCls} value={form.duration} onChange={(e) => update('duration', e.target.value)} placeholder="18:42" />
        </div>
        <div>
          <label className={labelCls}>Views (e.g. 12.4K)</label>
          <input className={inputCls} value={form.views} onChange={(e) => update('views', e.target.value)} placeholder="12.4K" />
        </div>
        <div>
          <label className={labelCls}>Date (e.g. June 2025)</label>
          <input className={inputCls} value={form.date} onChange={(e) => update('date', e.target.value)} placeholder="June 2025" />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>YouTube URL *</label>
          <input className={inputCls} value={form.youtubeUrl} onChange={(e) => update('youtubeUrl', e.target.value)} required />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Thumbnail Image URL *</label>
          <input className={inputCls} value={form.thumbnail} onChange={(e) => update('thumbnail', e.target.value)} required placeholder="https://images.unsplash.com/..." />
          {form.thumbnail && <img src={form.thumbnail} alt="" className="mt-2 h-24 w-full object-cover opacity-60" onError={(e) => e.target.style.display='none'} />}
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="active" checked={form.active} onChange={(e) => update('active', e.target.checked)} className="w-4 h-4 accent-yellow-500" />
          <label htmlFor="active" className="font-body text-sm text-cream/70">Visible on site</label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving} className="bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-300 disabled:opacity-50">
          {saving ? 'Saving...' : isEdit ? 'Update Video' : 'Add Video'}
        </button>
        <button type="button" onClick={() => router.push('/admin/videos')} className="border border-gold/20 text-cream/50 hover:text-gold font-body text-xs tracking-widest uppercase px-6 py-3.5 transition-all duration-300">
          Cancel
        </button>
      </div>
    </form>
  )
}

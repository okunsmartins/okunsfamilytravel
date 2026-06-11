'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DestinationForm({ destination }) {
  const router = useRouter()
  const isEdit = !!destination

  const [form, setForm] = useState({
    name: destination?.name || '',
    country: destination?.country || 'Ireland',
    tagline: destination?.tagline || '',
    description: destination?.description || '',
    image: destination?.image || '',
    posts: destination?.posts || 0,
    tag: destination?.tag || 'Ireland',
    active: destination?.active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isEdit ? `/api/destinations/${destination.id}` : '/api/destinations'
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, posts: parseInt(form.posts) }),
    })
    setSaving(false)
    if (!res.ok) { setError('Failed to save.'); return }
    router.push('/admin/destinations')
    router.refresh()
  }

  const inputCls = "w-full bg-onyx border border-gold/15 focus:border-gold/50 text-cream font-body text-sm px-4 py-3 outline-none transition-colors placeholder:text-cream/20"
  const labelCls = "block font-body text-xs text-cream/50 tracking-widest uppercase mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="bg-red-900/30 border border-red-500/30 text-red-400 font-body text-sm px-4 py-3">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Destination Name *</label>
          <input className={inputCls} value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="e.g. Cork" />
        </div>
        <div>
          <label className={labelCls}>Country / Region</label>
          <input className={inputCls} value={form.country} onChange={(e) => update('country', e.target.value)} placeholder="Ireland" />
        </div>
        <div>
          <label className={labelCls}>Tag</label>
          <select className={inputCls} value={form.tag} onChange={(e) => update('tag', e.target.value)}>
            <option>Ireland</option>
            <option>World</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Tagline</label>
          <input className={inputCls} value={form.tagline} onChange={(e) => update('tagline', e.target.value)} placeholder="e.g. The Rebel County" />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Description *</label>
          <textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} required />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Image URL *</label>
          <input className={inputCls} value={form.image} onChange={(e) => update('image', e.target.value)} required placeholder="https://images.unsplash.com/..." />
          {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-full object-cover opacity-60" onError={(e) => e.target.style.display='none'} />}
        </div>
        <div>
          <label className={labelCls}>Article Count</label>
          <input type="number" className={inputCls} value={form.posts} onChange={(e) => update('posts', e.target.value)} min={0} />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" id="active" checked={form.active} onChange={(e) => update('active', e.target.checked)} className="w-4 h-4 accent-yellow-500" />
          <label htmlFor="active" className="font-body text-sm text-cream/70">Visible on site</label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving} className="bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-300 disabled:opacity-50">
          {saving ? 'Saving...' : isEdit ? 'Update' : 'Add Destination'}
        </button>
        <button type="button" onClick={() => router.push('/admin/destinations')} className="border border-gold/20 text-cream/50 hover:text-gold font-body text-xs tracking-widest uppercase px-6 py-3.5 transition-all duration-300">
          Cancel
        </button>
      </div>
    </form>
  )
}

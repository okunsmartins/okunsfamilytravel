'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = ['Family Days Out', 'Castle Stays', 'Hotels', 'Food & Restaurants', 'Beaches & Nature', 'Road Trips', 'Travel Tips', 'Ireland Travel', 'World Travel']

export default function BlogForm({ post }) {
  const router = useRouter()
  const isEdit = !!post

  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    category: post?.category || categories[0],
    date: post?.date || new Date().toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: post?.readTime || '5 min read',
    author: post?.author || 'Okuns Family',
    published: post?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const url = isEdit ? `/api/blog/${post.id}` : '/api/blog'
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    if (!res.ok) { setError('Failed to save. Please try again.'); return }
    router.push('/admin/blog')
    router.refresh()
  }

  const inputCls = "w-full bg-onyx border border-gold/15 focus:border-gold/50 text-cream font-body text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-cream/20"
  const labelCls = "block font-body text-xs text-cream/50 tracking-widest uppercase mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && <div className="bg-red-900/30 border border-red-500/30 text-red-400 font-body text-sm px-4 py-3">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title *</label>
          <input className={inputCls} value={form.title} onChange={(e) => update('title', e.target.value)} required placeholder="Enter blog post title" />
        </div>

        <div>
          <label className={labelCls}>Category</label>
          <select className={inputCls} value={form.category} onChange={(e) => update('category', e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Read Time</label>
          <input className={inputCls} value={form.readTime} onChange={(e) => update('readTime', e.target.value)} placeholder="5 min read" />
        </div>

        <div>
          <label className={labelCls}>Date</label>
          <input className={inputCls} value={form.date} onChange={(e) => update('date', e.target.value)} placeholder="June 8, 2025" />
        </div>

        <div>
          <label className={labelCls}>Author</label>
          <input className={inputCls} value={form.author} onChange={(e) => update('author', e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Image URL *</label>
          <input className={inputCls} value={form.image} onChange={(e) => update('image', e.target.value)} required placeholder="https://images.unsplash.com/..." />
          {form.image && <img src={form.image} alt="" className="mt-2 h-28 w-full object-cover opacity-70" onError={(e) => e.target.style.display='none'} />}
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Excerpt *</label>
          <textarea className={`${inputCls} resize-none`} rows={3} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} required placeholder="Short summary shown on the blog listing page..." />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Full Content</label>
          <textarea className={`${inputCls} resize-y`} rows={10} value={form.content} onChange={(e) => update('content', e.target.value)} placeholder="Full blog post content..." />
        </div>

        <div className="sm:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="published" checked={form.published} onChange={(e) => update('published', e.target.checked)} className="w-4 h-4 accent-yellow-500" />
          <label htmlFor="published" className="font-body text-sm text-cream/70 cursor-pointer">Published (visible on the live website)</label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving}
          className="bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-300 disabled:opacity-50">
          {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blog')}
          className="border border-gold/20 text-cream/50 hover:text-gold hover:border-gold/40 font-body text-xs tracking-widest uppercase px-6 py-3.5 transition-all duration-300">
          Cancel
        </button>
      </div>
    </form>
  )
}

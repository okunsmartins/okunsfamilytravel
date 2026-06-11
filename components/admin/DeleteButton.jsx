'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteButton({ id, type }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  const endpointMap = { blog: '/api/blog', destinations: '/api/destinations', videos: '/api/videos' }

  const handleDelete = async () => {
    setLoading(true)
    await fetch(`${endpointMap[type]}/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={handleDelete} disabled={loading}
          className="font-body text-xs text-red-400 hover:text-red-300 px-2 py-1 transition-colors disabled:opacity-50">
          {loading ? '...' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)} className="font-body text-xs text-cream/30 hover:text-cream/60 px-1 py-1 transition-colors">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => setConfirming(true)}
      className="font-body text-xs text-cream/25 hover:text-red-400 transition-colors px-2 py-1">
      Delete
    </button>
  )
}

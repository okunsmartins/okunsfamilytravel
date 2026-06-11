import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminVideos() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const videos = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <AdminShell user={session.user}>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-cream">YouTube Videos</h1>
            <p className="font-body text-sm text-cream/40 mt-1">{videos.length} video{videos.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/videos/new" className="flex items-center gap-2 bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-5 py-3 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            Add Video
          </Link>
        </div>

        <div className="border border-gold/10 divide-y divide-gold/5">
          {videos.length === 0 && (
            <div className="p-12 text-center">
              <p className="font-body text-cream/30 text-sm">No videos yet. <Link href="/admin/videos/new" className="text-gold hover:underline">Add one →</Link></p>
            </div>
          )}
          {videos.map((v) => (
            <div key={v.id} className="flex items-center justify-between px-5 py-4 hover:bg-gold/5 transition-colors group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-10 flex-shrink-0 overflow-hidden bg-onyx relative">
                  <img src={v.thumbnail} alt="" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-gold/70 flex items-center justify-center">
                      <svg className="w-2 h-2 text-onyx ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-body text-sm text-cream/80 truncate group-hover:text-gold transition-colors">{v.title}</p>
                  <p className="font-body text-xs text-cream/30 mt-0.5">{v.category} · {v.duration} · {v.views} views · {v.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                <span className={`font-body text-xs px-2 py-0.5 border ${v.active ? 'bg-green-900/20 text-green-400 border-green-500/20' : 'bg-cream/5 text-cream/30 border-cream/10'}`}>
                  {v.active ? 'Live' : 'Hidden'}
                </span>
                <Link href={`/admin/videos/${v.id}/edit`} className="font-body text-xs text-cream/50 hover:text-gold transition-colors px-2 py-1">Edit</Link>
                <DeleteButton id={v.id} type="videos" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const [postCount, destCount, videoCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.destination.count(),
    prisma.video.count(),
  ])

  const recentPosts = await prisma.blogPost.findMany({
    take: 5, orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, category: true, published: true, createdAt: true },
  })

  const stats = [
    { label: 'Blog Posts', value: postCount, href: '/admin/blog', color: 'from-gold/20 to-gold/5', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { label: 'Destinations', value: destCount, href: '/admin/destinations', color: 'from-blue-900/30 to-blue-900/5', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Videos', value: videoCount, href: '/admin/videos', color: 'from-red-900/30 to-red-900/5', icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' },
  ]

  return (
    <AdminShell user={session.user}>
      <div className="max-w-5xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl text-cream">Welcome back, <span className="text-gold italic">{session.user.name}</span></h1>
          <p className="font-body text-sm text-cream/40 mt-1">Manage your Okuns Family Travel website content below.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}
              className={`group relative bg-gradient-to-br ${s.color} border border-gold/10 hover:border-gold/30 p-6 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <svg className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/>
                </svg>
                <svg className="w-4 h-4 text-cream/20 group-hover:text-gold/50 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
              <div className="font-display text-4xl text-cream">{s.value}</div>
              <div className="font-body text-xs text-cream/50 tracking-widest uppercase mt-1">{s.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { label: 'New Blog Post', href: '/admin/blog/new' },
            { label: 'New Destination', href: '/admin/destinations/new' },
            { label: 'New Video', href: '/admin/videos/new' },
          ].map((a) => (
            <Link key={a.label} href={a.href}
              className="flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-onyx border border-gold/30 font-body text-xs tracking-widest uppercase py-3 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              {a.label}
            </Link>
          ))}
        </div>

        {/* Recent posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-cream">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="font-body text-xs text-gold/60 hover:text-gold tracking-widest uppercase transition-colors">View all →</Link>
          </div>
          <div className="border border-gold/10 divide-y divide-gold/5">
            {recentPosts.length === 0 && (
              <p className="font-body text-sm text-cream/30 p-6 text-center">No posts yet. <Link href="/admin/blog/new" className="text-gold hover:underline">Create your first post →</Link></p>
            )}
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-5 py-4 hover:bg-gold/5 transition-colors group">
                <div className="min-w-0">
                  <p className="font-body text-sm text-cream/80 truncate group-hover:text-gold transition-colors">{post.title}</p>
                  <p className="font-body text-xs text-cream/30 mt-0.5">{post.category} · {new Date(post.createdAt).toLocaleDateString('en-IE')}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className={`font-body text-xs px-2 py-0.5 ${post.published ? 'bg-green-900/30 text-green-400 border border-green-500/20' : 'bg-cream/5 text-cream/30 border border-cream/10'}`}>
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                  <Link href={`/admin/blog/${post.id}/edit`} className="font-body text-xs text-cream/40 hover:text-gold transition-colors">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

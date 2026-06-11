import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminBlog() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <AdminShell user={session.user}>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-cream">Blog Posts</h1>
            <p className="font-body text-sm text-cream/40 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
          </div>
          <Link href="/admin/blog/new"
            className="flex items-center gap-2 bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-5 py-3 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
            New Post
          </Link>
        </div>

        <div className="border border-gold/10 divide-y divide-gold/5">
          {posts.length === 0 && (
            <div className="p-12 text-center">
              <p className="font-body text-cream/30 text-sm mb-4">No blog posts yet.</p>
              <Link href="/admin/blog/new" className="font-body text-xs text-gold hover:underline tracking-widest uppercase">Create your first post →</Link>
            </div>
          )}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-5 py-4 hover:bg-gold/5 transition-colors group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-onyx">
                  <img src={post.image} alt="" className="w-full h-full object-cover opacity-70" />
                </div>
                <div className="min-w-0">
                  <p className="font-body text-sm text-cream/80 truncate group-hover:text-gold transition-colors">{post.title}</p>
                  <p className="font-body text-xs text-cream/30 mt-0.5">{post.category} · {post.readTime} · {post.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                <span className={`font-body text-xs px-2 py-0.5 border ${post.published ? 'bg-green-900/20 text-green-400 border-green-500/20' : 'bg-cream/5 text-cream/30 border-cream/10'}`}>
                  {post.published ? 'Live' : 'Draft'}
                </span>
                <Link href={`/admin/blog/${post.id}/edit`} className="font-body text-xs text-cream/50 hover:text-gold transition-colors px-2 py-1">Edit</Link>
                <DeleteButton id={post.id} type="blog" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}

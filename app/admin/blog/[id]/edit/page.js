import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import BlogForm from '@/components/admin/BlogForm'

export default async function EditBlogPost({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const post = await prisma.blogPost.findUnique({ where: { id: parseInt(params.id) } })
  if (!post) notFound()

  return (
    <AdminShell user={session.user}>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-cream">Edit Post</h1>
          <p className="font-body text-sm text-cream/40 mt-1 truncate">{post.title}</p>
        </div>
        <BlogForm post={post} />
      </div>
    </AdminShell>
  )
}

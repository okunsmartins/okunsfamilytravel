import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminShell from '@/components/AdminShell'
import BlogForm from '@/components/admin/BlogForm'

export default async function NewBlogPost() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <AdminShell user={session.user}>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-cream">New Blog Post</h1>
          <p className="font-body text-sm text-cream/40 mt-1">Create a new travel story or guide.</p>
        </div>
        <BlogForm />
      </div>
    </AdminShell>
  )
}

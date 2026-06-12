import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/AdminShell'
import SlideForm from '@/components/admin/SlideForm'

export default async function NewSlidePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <AdminShell user={session.user}>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-cream">New Hero Slide</h1>
        <p className="font-body text-sm text-cream/40 mt-1">Add a new slide to the homepage carousel</p>
      </div>
      <SlideForm />
    </AdminShell>
  )
}

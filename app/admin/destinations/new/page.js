import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminShell from '@/components/AdminShell'
import DestinationForm from '@/components/admin/DestinationForm'

export default async function NewDestination() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  return (
    <AdminShell user={session.user}>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-cream">New Destination</h1>
        </div>
        <DestinationForm />
      </div>
    </AdminShell>
  )
}

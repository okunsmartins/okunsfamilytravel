import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import DestinationForm from '@/components/admin/DestinationForm'

export default async function EditDestination({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const dest = await prisma.destination.findUnique({ where: { id: parseInt(params.id) } })
  if (!dest) notFound()
  return (
    <AdminShell user={session.user}>
      <div className="max-w-2xl">
        <div className="mb-8"><h1 className="font-display text-3xl text-cream">Edit: {dest.name}</h1></div>
        <DestinationForm destination={dest} />
      </div>
    </AdminShell>
  )
}

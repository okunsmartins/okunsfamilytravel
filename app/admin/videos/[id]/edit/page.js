import { redirect, notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import VideoForm from '@/components/admin/VideoForm'

export default async function EditVideo({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const video = await prisma.video.findUnique({ where: { id: parseInt(params.id) } })
  if (!video) notFound()
  return (
    <AdminShell user={session.user}>
      <div className="max-w-2xl">
        <div className="mb-8"><h1 className="font-display text-3xl text-cream">Edit Video</h1></div>
        <VideoForm video={video} />
      </div>
    </AdminShell>
  )
}

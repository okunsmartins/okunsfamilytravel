import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import AdminShell from '@/components/AdminShell'
import SlideForm from '@/components/admin/SlideForm'

export default async function EditSlidePage({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const slide = await prisma.heroSlide.findUnique({ where: { id: parseInt(params.id) } })
  if (!slide) notFound()

  return (
    <AdminShell user={session.user}>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-cream">Edit Slide</h1>
        <p className="font-body text-sm text-cream/40 mt-1">{slide.heading} {slide.italic}</p>
      </div>
      <SlideForm slide={slide} />
    </AdminShell>
  )
}

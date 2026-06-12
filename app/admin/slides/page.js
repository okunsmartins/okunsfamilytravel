import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/AdminShell'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function SlidesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } })

  return (
    <AdminShell user={session.user}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-cream">Hero Slides</h1>
          <p className="font-body text-sm text-cream/40 mt-1">Manage the homepage carousel</p>
        </div>
        <Link href="/admin/slides/new"
          className="bg-gold text-onyx font-body text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold/80 transition-colors">
          + New Slide
        </Link>
      </div>

      <div className="space-y-3">
        {slides.length === 0 && (
          <div className="text-center py-16 text-cream/30 font-body">No slides yet. Add your first slide.</div>
        )}
        {slides.map((slide) => (
          <div key={slide.id} className="bg-charcoal border border-gold/10 p-4 flex items-center gap-4">
            <img src={slide.image} alt={slide.heading} className="w-24 h-16 object-cover flex-shrink-0 opacity-80" onError={e => e.target.style.display='none'} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-xs text-gold/60 tracking-widest uppercase">#{slide.order}</span>
                <span className={`font-body text-xs px-2 py-0.5 ${slide.active ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                  {slide.active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="font-display text-cream text-sm truncate">{slide.heading} <span className="text-gold italic">{slide.italic}</span></p>
              <p className="font-body text-cream/40 text-xs truncate">{slide.location} · {slide.tag}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={`/admin/slides/${slide.id}/edit`}
                className="font-body text-xs text-cream/50 hover:text-gold tracking-widest uppercase px-3 py-2 border border-gold/10 hover:border-gold/30 transition-colors">
                Edit
              </Link>
              <DeleteButton id={slide.id} type="slides" />
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  )
}

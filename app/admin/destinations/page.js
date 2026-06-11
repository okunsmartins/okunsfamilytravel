import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/AdminShell'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminDestinations() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const destinations = await prisma.destination.findMany({ orderBy: { createdAt: 'asc' } })

  return (
    <AdminShell user={session.user}>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-cream">Destinations</h1>
            <p className="font-body text-sm text-cream/40 mt-1">{destinations.length} destination{destinations.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/destinations/new" className="flex items-center gap-2 bg-gold hover:bg-gold-light text-onyx font-body text-xs tracking-widest uppercase px-5 py-3 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            New Destination
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.length === 0 && (
            <div className="col-span-3 p-12 text-center border border-gold/10">
              <p className="font-body text-cream/30 text-sm">No destinations yet. <Link href="/admin/destinations/new" className="text-gold hover:underline">Add one →</Link></p>
            </div>
          )}
          {destinations.map((d) => (
            <div key={d.id} className="bg-charcoal border border-gold/10 hover:border-gold/25 transition-all duration-200 overflow-hidden group">
              <div className="relative h-32 overflow-hidden">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-onyx/40" />
                <div className="absolute top-2 right-2">
                  <span className={`font-body text-xs px-2 py-0.5 border ${d.active ? 'bg-green-900/40 text-green-400 border-green-500/20' : 'bg-cream/5 text-cream/30 border-cream/10'}`}>
                    {d.active ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3">
                  <span className="font-accent text-gold text-xs tracking-wider">{d.tag}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg text-cream">{d.name}</h3>
                <p className="font-body text-xs text-cream/40 mt-0.5">{d.tagline}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-body text-xs text-cream/30">{d.posts} articles</span>
                  <div className="flex gap-2">
                    <Link href={`/admin/destinations/${d.id}/edit`} className="font-body text-xs text-cream/50 hover:text-gold transition-colors">Edit</Link>
                    <DeleteButton id={d.id} type="destinations" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}

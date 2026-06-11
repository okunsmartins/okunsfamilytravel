import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(destinations)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const dest = await prisma.destination.create({ data })
    return NextResponse.json(dest, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 })
  }
}

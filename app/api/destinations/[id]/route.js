import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  try {
    const dest = await prisma.destination.findUnique({ where: { id: parseInt(params.id) } })
    if (!dest) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(dest)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const dest = await prisma.destination.update({
      where: { id: parseInt(params.id) },
      data,
    })
    return NextResponse.json(dest)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.destination.delete({ where: { id: parseInt(params.id) } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 })
  }
}

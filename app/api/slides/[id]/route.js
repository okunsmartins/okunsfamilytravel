import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req, { params }) {
  const slide = await prisma.heroSlide.findUnique({ where: { id: parseInt(params.id) } })
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(slide)
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  const slide = await prisma.heroSlide.update({ where: { id: parseInt(params.id) }, data })
  return NextResponse.json(slide)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.heroSlide.delete({ where: { id: parseInt(params.id) } })
  return NextResponse.json({ success: true })
}

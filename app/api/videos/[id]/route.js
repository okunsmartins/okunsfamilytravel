import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  try {
    const video = await prisma.video.findUnique({ where: { id: parseInt(params.id) } })
    if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(video)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const video = await prisma.video.update({
      where: { id: parseInt(params.id) },
      data,
    })
    return NextResponse.json(video)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.video.delete({ where: { id: parseInt(params.id) } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }
}

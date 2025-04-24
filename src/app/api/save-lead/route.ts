import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/services/database'

export async function POST(req: NextRequest) {
  const { name, telephone, destinationSlug } = await req.json()

  if (!destinationSlug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const destination = await prisma.destination.findUnique({
    where: { slug: destinationSlug },
    select: { id: true }
  })

  if(!destination) {
    return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
  }

  const lead = await prisma.leads.create({
    data: {
      name,
      telephone,
      interestedDestination: destination.id
    }
  })

  return NextResponse.json(lead, { status: 201 })
}

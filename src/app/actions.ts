'use server'

import { prisma } from '@/services/database'

export async function getHeroHeader() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return destinations
}


export async function getDestination(id: any) {
  const destination = await prisma.destination.findUnique({
    where: {
      id
    }
  })

  return destination
}
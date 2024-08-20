'use server'

import { prisma } from '@/services/database'

export async function getHeroHeader() {
  // Busca todos os destinos ordenados por data de criação
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      company: true // Inclui os dados da companhia aérea
    }
  })

  return destinations
}


export async function getDestination(id: any) {
  const destination = await prisma.destination.findUnique({
    where: {
      id
    },
    include: {
      company: true // Inclui os dados da companhia aérea
    }
  })

  return destination
}
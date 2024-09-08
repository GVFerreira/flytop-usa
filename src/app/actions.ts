'use server'

import { prisma } from '@/services/database'

export async function getHeroHeader() {
  // Busca todos os destinos ordenados por data de criação
  const destinations = await prisma.destination.findMany({
    where: {
      categories: {
        some: {
          categoryId: "8306031f-a117-47ba-bdf8-e73bb8c6a154"
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      company: true // Inclui os dados da companhia aérea
    },
    take: 6
  })

  return destinations
}

export async function getAlsoInterested() {
  // Busca todos os destinos ordenados por data de criação
  const destinations = await prisma.destination.findMany({
    where: {
      categories: {
        some: {
          categoryId: "6b7a52e6-d56a-45a1-9c66-6480839b314a"
        }
      }
    },
    include: {
      company: true // Inclui os dados da companhia aérea
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 9
  })

  return destinations
}

export async function getDestinations() {
  const destinations = await prisma.destination.findMany({
    include: {
      categories: {
        include: {
          category: true
        }
      },
      company: true
    }
  })
  
  return destinations
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return categories
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

export async function createNewsletter(data: any) {
  const newsletter = await prisma.newsletter.create({
    data: {
      email: data.email,
    }
  })

  return newsletter
}

export async function getNewsletter() {
  const newsletter = await prisma.newsletter.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return newsletter
}
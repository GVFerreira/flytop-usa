'use server'

import { prisma } from '@/services/database'

export async function getHeroHeader() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      company: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    take: 8
  })

  return destinations
}

export async function getDestinations() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: "asc"
    },
    include: {
      company: true,
      categories: {
        include: {
          category: true
        }
      },
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

export async function getDestination(slug: any) {
  const destination = await prisma.destination.findUnique({
    where: {
      slug
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

export async function getClient() {
  const client = await prisma.client.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return client
}
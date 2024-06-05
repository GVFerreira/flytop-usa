'use server'

import { prisma } from '@/services/database'

export async function getDestinations() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return destinations
}

export async function getUniqueDestination(id: string) {
  const destination = await prisma.destination.findUnique({
    where: {
      id
    }
  })

  return destination
}

export async function createDestinations(data: any) {
  const destination = await prisma.destination.create({
    data: {
      name: data.destination_name,
      value: parseInt(data.value),
      departure_date: new Date(data.departure_date),
      return_date: new Date(data.return_date),
      flight_company: data.flight_company,
      departure_airport: data.departure_airport,
      destination_airport: data.destination_airport,
      flight_stopover: Boolean(data.flight_stopover),
      airport_stopover: data.stopover_airport
    }
  })

  return destination
}
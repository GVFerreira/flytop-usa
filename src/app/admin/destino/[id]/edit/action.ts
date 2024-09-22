'use server'

import { prisma } from '@/services/database'
import { storageProvider } from "@/services/storage"

export async function getUniqueDestination(id: string) {
  const destination = await prisma.destination.findUnique({
    where: { id },
    include: {
      categories: true,  // Incluir as categorias se necessário
    }
  })

  if (!destination) return null

  return {
    id: destination.id,
    name: destination.name,
    subtitle: destination.subtitle,
    price: destination.price,
    regularPrice: destination.regularPrice,
    departureDates: destination.departureDates,
    returnDates: destination.returnDates,
    flightCompanyId: destination.flightCompanyId,
    departureCity: destination.departureCity,
    departureAirport: destination.departureAirport,
    destinationAirport: destination.destinationAirport,
    flightStopover: destination.flightStopover || false,
    stopoverAirport: destination.airportStopover || undefined,
    imagePath: destination.imagePath,
    imagesSlide: JSON.parse(destination.imageSlide),
    categories: destination.categories.map(category => category.categoryId)
  }
}

export async function submitFormAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  const url = await storageProvider.upload(file)
  
  return {
    url
  }
}

export async function updateDestination(data: any, dest_id: string) {
  function createSlug(text: string) {
    return text
      .toLowerCase() // Converte para minúsculas
      .normalize('NFD') // Normaliza acentos e caracteres especiais
      .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, exceto espaços e hífens
      .trim() // Remove espaços no início e no fim
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens consecutivos
  }

  const destination_slug = `from ${data.departureCity} to ${data.name}`

  const updatedDestination = await prisma.destination.update({
    where: { id: dest_id },
    data: {
      name: data.name,
      slug: createSlug(destination_slug),
      subtitle: data.subtitle,
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regularPrice),
      departureDates: data.departureDates,
      returnDates: data.returnDates,
      departureCity: data.departureCity,
      departureAirport: data.departureAirport,
      destinationAirport: data.destinationAirport,
      flightStopover: Boolean(data.flightStopover),
      airportStopover: data.stopoverAirport,
      imagePath: data.imagePath,
      imageSlide: JSON.stringify(data.imagesSlide),
      flightCompanyId: data.flightCompanyId
    }
  })

  // Remove as categorias antigas
  await prisma.destinationCategory.deleteMany({
    where: { destinationId: dest_id }
  })

  // Adiciona as novas categorias
  await prisma.destinationCategory.createMany({
    data: data.categories.map((categoryId: string) => ({
      destinationId: dest_id,
      categoryId
    }))
  })

  return updatedDestination
}

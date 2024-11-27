'use server'

import { prisma } from '@/services/database'
import { storageProvider } from "@/services/storage"
import bcrypt from 'bcryptjs'


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

export async function getDestinationsByCategory(categoryId: string) {
  try {
    const destinations = await prisma.destination.findMany({
      where: {
        categories: {
          some: {
            id: categoryId
          }
        }
      }
    });

    return destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw new Error('Error fetching destinations');
  }
}

export async function createDestinations(data: any) {
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

  const destination_slug = `from ${data.departure_city} to ${data.destination_name}`

  const destination = await prisma.destination.create({
    data: {
      name: data.destination_name,
      slug: createSlug(destination_slug),
      subtitle: data.subtitle,
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      isCADol: Boolean(data.is_ca_dol),
      departureDates: data.departure_date,
      returnDates: data.return_date,
      departureCity: data.departure_city,
      departureAirport: data.departure_airport,
      destinationAirport: data.destination_airport,
      flightStopover: Boolean(data.flight_stopover),
      airportStopover: data.stopover_airport,
      imagePath: data.image_path,
      imageSlide: JSON.stringify(data.images_slide),
      flightCompanyId: data.flight_company,
    }
  })

  // Associa as categorias ao destino
  await prisma.destinationCategory.createMany({
    data: data.categories.map((categoryId: string) => ({
      destinationId: destination.id,
      categoryId
    }))
  })

  return destination
}

export async function deleteDestination(id: string, urlImage: string) {
  function extractFileNameFromUrl(url: string): string | null {
      // Para extrair apenas o nome do arquivo, podemos dividir o caminho usando '/'
      // e pegar o último elemento (que deve ser o nome do arquivo)
      const pathParts = url.split('/')
      const fileName = pathParts[pathParts.length - 1]
  
      return fileName
  }

  try {
    const path = extractFileNameFromUrl(urlImage)

    await storageProvider.delete(path as string)
    await prisma.destination.delete({
      where: {
        id
      }
    })
    return {status: 200, msg: 'Destination deleted' }
  } catch (e) {
    console.log(e)
    return {status: 204, msg: 'Destination not found' }
  }
}

export async function createCategory(data: any) {
  function createSlug(text: string) {
    return text
      .toLowerCase() // Converte para minúsculas
      .normalize('NFD') // Normaliza acentos e caracteres especiais
      .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, exceto espaços e hífens
      .trim() // Remove espaços no início e no fim
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens consecutivos
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: createSlug(data.name),
      isAirport: data.is_airport
    }
  })

  return category
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return categories
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: {
        id
      }
    })
    return {status: 200, msg: 'Category deleted' }
  } catch (e) {
    console.log(e)
    return {status: 204, msg: 'Category not found' }
  }
}

export async function createCompany(data: any) {
  function createSlug(text: string) {
    return text
      .toLowerCase() // Converte para minúsculas
      .normalize('NFD') // Normaliza acentos e caracteres especiais
      .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais, exceto espaços e hífens
      .trim() // Remove espaços no início e no fim
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens consecutivos
  }

  const company = await prisma.company.create({
    data: {
      name: data.name,
      slug: createSlug(data.name),
      imagePath: data.image_path
    }
  })

  return company
}

export async function getCompanies() {
  const companies = await prisma.company.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return companies
}

export async function deleteCompanie(id: string) {
  try {
    await prisma.company.delete({
      where: {
        id
      }
    })
    return {status: 200, msg: 'Company deleted' }
  } catch (e) {
    console.log(e)
    return {status: 204, msg: 'Company not found' }
  }
}

export async function createFeedback(data: any) {
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
  
  const feedback = await prisma.feedbacks.create({
    data: {
      name: data.name,
      slug: createSlug(data.name),
      imagePath: data.image_path
    }
  })
  
  return feedback
}

export async function getFeedbacks() {
  const feedbacks = await prisma.feedbacks.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  })

  return feedbacks
}

export async function deleteFeedback(id: string) {
  try {
    await prisma.feedbacks.delete({
      where: {
        id
      }
    })
    return {status: 200, msg: 'Feedback deleted' }
  } catch (e) {
    console.log(e)
    return {status: 204, msg: 'Feedback not found' }
  }
}

export async function createUser(data: any) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })
  
  if (existingUser) {
    throw new Error("E-mail já cadastrado.")
  }
  
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(data.password_one, salt)
  
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  })
  
  return user
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return users
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: {
        id
      }
    })
    return {status: 200, msg: 'User deleted' }
  } catch (e) {
    console.log(e)
    return {status: 204, msg: 'User not found' }
  }
}
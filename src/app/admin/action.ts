'use server'

import { prisma } from '@/services/database'
import { promises as fs } from 'fs'
import path from 'path'


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
      price: parseFloat(data.price),
      regularPrice: parseFloat(data.regular_price),
      departureDates: data.departure_date,
      returnDates: data.return_date,
      departureAirport: data.departure_airport,
      destinationAirport: data.destination_airport,
      flightStopover: Boolean(data.flight_stopover),
      airportStopover: data.stopover_airport,
      imagePath: data.image_path,
      flightCompanyId: data.flight_company,
      categoryId: data.category
    }
  })

  return destination
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
      slug: createSlug(data.name)
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
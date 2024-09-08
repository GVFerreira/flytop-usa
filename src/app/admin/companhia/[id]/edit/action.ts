'use server'

import { prisma } from "@/services/database"
import { storageProvider } from "@/services/storage"

export async function submitFormAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  const url = await storageProvider.upload(file)
  
  return {
    url
  }
}

export async function getUniqueCompany(id: string) {
  const company = await prisma.company.findUnique({
    where: { id }
  })

  if (!company) return null

  return company
}

export async function updateCompany(data: any, comp_id: string) {
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

  const updatedCompany = await prisma.company.update({
    where: { id: comp_id },
    data: {
      name: data.name,
      slug: createSlug(data.name),
      imagePath: data.imagePath
    }
  })

  return updatedCompany
}

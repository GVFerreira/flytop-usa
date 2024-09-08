'use server'

import { prisma } from '@/services/database'

export async function getUniqueCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id }
  })

  if (!category) return null

  return category
}

export async function updateCategory(data: any, cat_id: string) {
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

  const updatedCategory = await prisma.category.update({
    where: { id: cat_id },
    data: {
      name: data.name,
      slug: createSlug(data.name)
    }
  })

  return updatedCategory
}

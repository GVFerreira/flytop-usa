'use client'

import { getCategories, deleteCategory } from "../../action"

import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from "react"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Categories() {
  // Defina o estado como um array de Category
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const data: Category[] = await getCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  async function handleDelete(id: string) {
    const category = await deleteCategory(id)

    if (category.status === 200) {
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso"
      })
      setCategories(categories.filter(category => category.id !== id))
    } else {
      toast({
        title: "Erro",
        description: "Não é possível excluir a categoria, pois existem destinos relacionados a ela."
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={index}>
            <TableCell>
              <p>{category.name}</p>
            </TableCell>
            <TableCell>
              <p>{category.slug}</p>
            </TableCell>
            <TableCell className="h-full flex flex-row items-center justify-center gap-x-4">
              <a href={`/admin/categoria/${category.id}/edit`} >
                <Pencil className="text-yellow-500 size-6 cursor-pointer" />
              </a>
              <Trash2 className="text-red-500 size-6 cursor-pointer" onClick={() => handleDelete(category.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

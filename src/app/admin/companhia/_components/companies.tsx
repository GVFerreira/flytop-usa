'use client'

import { deleteCompanie, getCompanies } from "../../action"
import Image from 'next/image'

import { Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { toast } from "@/components/ui/use-toast"

interface Categories {
  id: string
  name: string
  slug: string
  imagePath: string
}

export default function Companies() {
  // Defina o estado como um array de Company
  const [companies, setCompanies] = useState<Categories[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const data: Categories[] = await getCompanies()
      setCompanies(data)
    }
    fetchCategories()
  }, [])

  async function handleDelete(id: string) {
    const company = await deleteCompanie(id)

    if (company.status === 200) {
      toast({
        title: "Sucesso",
        description: "Companhia excluída com sucesso"
      })
      setCompanies(companies.filter(companie => companie.id !== id))
    } else {
      toast({
        title: "Erro",
        description: "Não é possível excluir a companhia, pois existem destinos relacionados a ela."
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Imagem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company, index) => (
          <TableRow key={index}>
             <TableCell>
              <Image
                src={company.imagePath}
                className="aspect-square rounded-md object-contain"
                height="64"
                width="64"
                alt="Product image"
              />
            </TableCell>
            <TableCell>
              <p>{company.name}</p>
            </TableCell>
            <TableCell>
              <p>{company.slug}</p>
            </TableCell>
            <TableCell className="h-full flex flex-row items-center justify-center gap-x-4">
              <a href={`/admin/companhia/${company.id}/edit`}>
                <Pencil className="text-yellow-500 size-6 cursor-pointer" />
              </a>
              <Trash2 className="text-red-500 size-6 cursor-pointer" onClick={() => handleDelete(company.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

'use server'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { getCompanies } from "../../action"

export default async function Companies() {
  const companies = await getCompanies()

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
              <Trash2 className="text-red-500 size-6 cursor-pointer" /* onClick={() => handleDelete(destination.id, destination.imagePath)} */ />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

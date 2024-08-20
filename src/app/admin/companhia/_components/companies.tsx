'use server'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Pencil } from 'lucide-react'
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
          <TableHead>Ações</TableHead>
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
            <TableCell>
              <a href={`/admin/destino/${company.id}/edit`} className="flex bg-yellow-500 rounded-full size-10">
                <Pencil className="size-4 m-auto"/>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

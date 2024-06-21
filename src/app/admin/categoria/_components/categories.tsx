'use server'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getCategories } from "../../action"
import { Pencil } from 'lucide-react'


export default async function Categories() {
  const categories = await getCategories()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Ações</TableHead>
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
            <TableCell>
              <a href={`/admin/destino/${category.id}/edit`} className="flex bg-yellow-500 rounded-full size-10">
                <Pencil className="size-4 m-auto"/>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

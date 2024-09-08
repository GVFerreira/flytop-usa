'use server'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getCategories } from "../../action"
import { Pencil, Trash2 } from 'lucide-react'


export default async function Categories() {
  const categories = await getCategories()

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
              <Trash2 className="text-red-500 size-6 cursor-pointer" /* onClick={() => handleDelete(destination.id, destination.imagePath)} */ />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
